import React from 'react';
import { calculateDayTotals, getGoalPercentage } from '../../utils/nutrition';

function DayCard({ dateKey, meals, goal, onClick, label }) {
  const totals = calculateDayTotals(meals);
  const calPercent = getGoalPercentage(totals.calories, goal.calories);
  const proteinPercent = getGoalPercentage(totals.protein, goal.protein);
  const fatPercent = getGoalPercentage(totals.fat, goal.fat);
  const carbsPercent = getGoalPercentage(totals.carbs, goal.carbs);

  let statusClass = 'day-card--under';
  if (calPercent >= 100) statusClass = 'day-card--over';
  else if (calPercent >= 80) statusClass = 'day-card--near';

  return (
    <button
      className={`day-card ${statusClass}`}
      id={`day-card-${dateKey}`}
      onClick={() => onClick(dateKey)}
      type="button"
    >
      <div className="day-card__left">
        <span className="day-card__label">{label}</span>
        <span className="day-card__date">{dateKey}</span>
      </div>

      <div className="day-card__center">
        <div className="day-card__macro-bar">
          <div className="day-card__macro-segment day-card__macro-segment--protein" style={{ width: `${Math.min(proteinPercent, 100) / 3}%` }} />
          <div className="day-card__macro-segment day-card__macro-segment--fat" style={{ width: `${Math.min(fatPercent, 100) / 3}%` }} />
          <div className="day-card__macro-segment day-card__macro-segment--carbs" style={{ width: `${Math.min(carbsPercent, 100) / 3}%` }} />
        </div>
      </div>

      <div className="day-card__right">
        <span className="day-card__calories">{Math.round(totals.calories)}</span>
        <span className="day-card__cal-label">kcal</span>
      </div>
    </button>
  );
}

export default DayCard;
