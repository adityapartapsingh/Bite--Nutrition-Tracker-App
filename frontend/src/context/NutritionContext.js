import React, { createContext, useContext, useReducer, useEffect, useCallback, useRef } from 'react';
import { useAuth } from './AuthContext';
import { getTodayKey, generateId } from '../utils/nutrition';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:3001';
const STORAGE_KEY = 'bite-nutrition-data';

// ─── localStorage helpers ───
function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) { /* ignore */ }
  return null;
}

function saveToStorage(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      dailyGoal: state.dailyGoal,
      logs: state.logs,
    }));
  } catch (e) { /* ignore */ }
}

// ─── Default State ───
function getInitialState() {
  const saved = loadFromStorage();
  return {
    dailyGoal: saved?.dailyGoal || { calories: 2000, protein: 150, fat: 65, carbs: 250 },
    selectedDate: getTodayKey(),
    logs: saved?.logs || {},
    syncing: false,
  };
}

// ─── Reducer ───
function nutritionReducer(state, action) {
  switch (action.type) {
    case 'SET_GOAL':
      return { ...state, dailyGoal: { ...state.dailyGoal, ...action.payload } };

    case 'SET_DATE':
      return { ...state, selectedDate: action.payload };

    case 'SET_DAY_MEALS': {
      const { date, meals } = action.payload;
      return { ...state, logs: { ...state.logs, [date]: meals } };
    }

    case 'ADD_FOOD_LOCAL': {
      const { date, meal, food } = action.payload;
      const dayLog = state.logs[date] || { breakfast: [], lunch: [], dinner: [], snacks: [] };
      return {
        ...state,
        logs: {
          ...state.logs,
          [date]: {
            ...dayLog,
            [meal]: [...(dayLog[meal] || []), food],
          },
        },
      };
    }

    case 'REMOVE_FOOD_LOCAL': {
      const { date, meal, foodId } = action.payload;
      const currentDay = state.logs[date];
      if (!currentDay || !currentDay[meal]) return state;
      return {
        ...state,
        logs: {
          ...state.logs,
          [date]: {
            ...currentDay,
            [meal]: currentDay[meal].filter((f) => f.id !== foodId),
          },
        },
      };
    }

    case 'SET_SYNCING':
      return { ...state, syncing: action.payload };

    case 'LOAD_USER_DATA':
      return {
        ...state,
        dailyGoal: action.payload.dailyGoal || state.dailyGoal,
      };

    default:
      return state;
  }
}

// ─── Context ───
const NutritionContext = createContext(null);

// ─── Provider ───
export function NutritionProvider({ children }) {
  const { token, user } = useAuth();
  const [state, dispatch] = useReducer(nutritionReducer, null, getInitialState);
  const hasFetchedRef = useRef({});

  // Persist to localStorage on every state change
  useEffect(() => {
    saveToStorage(state);
  }, [state]);

  // Load user goals when authenticated
  useEffect(() => {
    if (user && user.dailyGoal) {
      dispatch({ type: 'LOAD_USER_DATA', payload: { dailyGoal: user.dailyGoal } });
    }
  }, [user]);

  // Fetch day logs from backend — only once per date per session
  const fetchDayLogs = useCallback(async (date) => {
    if (!token) return;
    if (hasFetchedRef.current[date]) return; // already fetched this date
    hasFetchedRef.current[date] = true;

    try {
      const res = await fetch(`${API_BASE}/api/logs/${date}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        dispatch({ type: 'SET_DAY_MEALS', payload: { date, meals: data.meals } });
      }
    } catch (err) {
      console.warn('Failed to fetch day logs:', err);
      // Keep local data as-is on network failure
    }
  }, [token]);

  useEffect(() => {
    if (token && state.selectedDate) {
      fetchDayLogs(state.selectedDate);
    }
  }, [token, state.selectedDate, fetchDayLogs]);

  // ─── Actions that sync with backend ───
  const addFood = useCallback(async (date, mealType, food) => {
    const foodWithId = { ...food, id: generateId(), quantity: food.quantity || 1 };

    // Optimistic local update (immediately visible)
    dispatch({
      type: 'ADD_FOOD_LOCAL',
      payload: { date, meal: mealType, food: foodWithId },
    });

    // Sync to backend
    if (token) {
      try {
        const res = await fetch(`${API_BASE}/api/logs`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ date, mealType, food: foodWithId }),
        });
        const data = await res.json();
        if (data.success && data.id) {
          // Swap temp ID with server-assigned ID
          dispatch({ type: 'REMOVE_FOOD_LOCAL', payload: { date, meal: mealType, foodId: foodWithId.id } });
          dispatch({
            type: 'ADD_FOOD_LOCAL',
            payload: { date, meal: mealType, food: { ...foodWithId, id: data.id } },
          });
        }
      } catch (err) {
        console.warn('Failed to sync food add:', err);
        // Item stays in local state even if backend is down
      }
    }
  }, [token]);

  const removeFood = useCallback(async (date, mealType, foodId) => {
    dispatch({
      type: 'REMOVE_FOOD_LOCAL',
      payload: { date, meal: mealType, foodId },
    });

    if (token) {
      try {
        await fetch(`${API_BASE}/api/logs/${foodId}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch (err) {
        console.warn('Failed to sync food delete:', err);
      }
    }
  }, [token]);

  const updateGoals = useCallback(async (goals) => {
    dispatch({ type: 'SET_GOAL', payload: goals });

    if (token) {
      try {
        await fetch(`${API_BASE}/api/goals`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(goals),
        });
      } catch (err) {
        console.warn('Failed to sync goals:', err);
      }
    }
  }, [token]);

  return (
    <NutritionContext.Provider value={{ state, dispatch, addFood, removeFood, updateGoals, fetchDayLogs }}>
      {children}
    </NutritionContext.Provider>
  );
}

// ─── Hook ───
export function useNutrition() {
  const context = useContext(NutritionContext);
  if (!context) throw new Error('useNutrition must be used within a NutritionProvider');
  return context;
}

export default NutritionContext;
