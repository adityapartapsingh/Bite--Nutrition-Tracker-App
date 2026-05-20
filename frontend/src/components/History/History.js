import React from 'react';
import { useNutrition } from '../../context/NutritionContext';
import { formatDayOfWeek, offsetDate, getTodayKey } from '../../utils/nutrition';
import DayCard from './DayCard';
import WeeklyChart from './WeeklyChart';
import './History.css';

function History({ onSelectDate }) {
  const { state, dispatch } = useNutrition();
  const { logs, dailyGoal } = state;
  const today = getTodayKey();

  // Generate last 7 days
  const days = [];
  for (let i = 0; i < 7; i++) {
    const dateKey = offsetDate(today, -i);
    days.push({
      dateKey,
      label: i === 0 ? 'Today' : i === 1 ? 'Yesterday' : formatDayOfWeek(dateKey),
      meals: logs[dateKey] || { breakfast: [], lunch: [], dinner: [], snacks: [] },
    });
  }

  const handleDayClick = (dateKey) => {
    dispatch({ type: 'SET_DATE', payload: dateKey });
    if (onSelectDate) onSelectDate(dateKey);
  };

  const hasAnyData = days.some(
    (d) => Object.values(d.meals).some((arr) => arr.length > 0)
  );

  return (
    <div className="history" id="history-view">
      <h1 className="history__title">History</h1>
      <p className="history__subtitle">Last 7 days</p>

      {hasAnyData && <WeeklyChart days={days} goal={dailyGoal} />}

      {hasAnyData ? (
        <div className="history__list">
          {days.map((day, index) => (
            <div
              key={day.dateKey}
              className="history__item"
              style={{ animationDelay: `${index * 60}ms` }}
            >
              <DayCard
                dateKey={day.dateKey}
                label={day.label}
                meals={day.meals}
                goal={dailyGoal}
                onClick={handleDayClick}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="history__empty" id="history-empty">
          <span className="history__empty-icon">📊</span>
          <h3>No history yet</h3>
          <p>Start logging meals to see your nutrition history here.</p>
        </div>
      )}
    </div>
  );
}

export default History;
