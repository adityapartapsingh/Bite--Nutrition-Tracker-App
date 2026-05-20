import React, { useState } from 'react';
import { useNutrition } from '../../context/NutritionContext';
import { calculateDayTotals, formatDate, offsetDate, isToday, formatDayOfWeek } from '../../utils/nutrition';
import CalorieRing from './CalorieRing';
import MacroBar from './MacroBar';
import MealSection from './MealSection';
import GoalSettings from '../Settings/GoalSettings';
import './Dashboard.css';

const MEALS = [
  { type: 'breakfast', title: 'Breakfast', icon: '🌅' },
  { type: 'lunch', title: 'Lunch', icon: '☀️' },
  { type: 'dinner', title: 'Dinner', icon: '🌙' },
  { type: 'snacks', title: 'Snacks', icon: '🍿' },
];

function Dashboard({ onNavigateToAdd, onSelectMeal }) {
  const { state, dispatch, removeFood } = useNutrition();
  const { dailyGoal, selectedDate, logs } = state;
  const [showGoalSettings, setShowGoalSettings] = useState(false);

  const dayLog = logs[selectedDate] || { breakfast: [], lunch: [], dinner: [], snacks: [] };
  const totals = calculateDayTotals(dayLog);

  const navigateDate = (offset) => {
    const newDate = offsetDate(selectedDate, offset);
    dispatch({ type: 'SET_DATE', payload: newDate });
  };

  const handleRemoveFood = (mealType, foodId) => {
    removeFood(selectedDate, mealType, foodId);
  };

  const handleAddClick = (mealType) => {
    if (onSelectMeal) onSelectMeal(mealType);
    if (onNavigateToAdd) onNavigateToAdd();
  };

  return (
    <div className="dashboard" id="dashboard-view">
      {/* Date Navigation */}
      <header className="dashboard__date-nav" id="date-nav">
        <button
          className="dashboard__date-btn"
          id="date-prev"
          onClick={() => navigateDate(-1)}
          aria-label="Previous day"
          type="button"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <div className="dashboard__date-display">
          <span className="dashboard__date-day">
            {isToday(selectedDate) ? 'Today' : formatDayOfWeek(selectedDate)}
          </span>
          <span className="dashboard__date-full">{formatDate(selectedDate)}</span>
        </div>

        <button
          className="dashboard__date-btn"
          id="date-next"
          onClick={() => navigateDate(1)}
          disabled={isToday(selectedDate)}
          aria-label="Next day"
          type="button"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </header>

      {/* Calorie Ring Hero */}
      <section className="dashboard__hero glass-card" id="calorie-hero">
        <CalorieRing consumed={totals.calories} goal={dailyGoal.calories} />
        <button
          className="dashboard__goal-btn"
          id="edit-goals-btn"
          onClick={() => setShowGoalSettings(true)}
          type="button"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
          </svg>
          <span>Goals</span>
        </button>
      </section>

      {/* Macro Bars */}
      <section className="dashboard__macros" id="macro-bars">
        <MacroBar
          label="Protein"
          current={totals.protein}
          goal={dailyGoal.protein}
          gradient="var(--gradient-protein)"
          accentColor="var(--accent-blue)"
          icon="💪"
        />
        <MacroBar
          label="Fat"
          current={totals.fat}
          goal={dailyGoal.fat}
          gradient="var(--gradient-fat)"
          accentColor="var(--accent-orange)"
          icon="🫧"
        />
        <MacroBar
          label="Carbs"
          current={totals.carbs}
          goal={dailyGoal.carbs}
          gradient="var(--gradient-carbs)"
          accentColor="var(--accent-purple)"
          icon="⚡"
        />
      </section>

      {/* Meal Sections */}
      <section className="dashboard__meals" id="meal-sections">
        {MEALS.map((meal) => (
          <MealSection
            key={meal.type}
            title={meal.title}
            icon={meal.icon}
            foods={dayLog[meal.type] || []}
            mealType={meal.type}
            onAddClick={handleAddClick}
            onRemoveFood={handleRemoveFood}
          />
        ))}
      </section>

      {/* Goal Settings Modal */}
      {showGoalSettings && (
        <GoalSettings onClose={() => setShowGoalSettings(false)} />
      )}
    </div>
  );
}

export default Dashboard;
