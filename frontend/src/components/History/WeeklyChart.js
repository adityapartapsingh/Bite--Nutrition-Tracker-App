import React from 'react';
import { calculateDayTotals } from '../../utils/nutrition';
import './WeeklyChart.css';

function WeeklyChart({ days, goal }) {
  if (!days || days.length === 0) return null;

  // Reverse so oldest is left, newest is right
  const chartDays = [...days].reverse();

  // Find max calories to scale bars
  const maxCal = Math.max(
    goal.calories,
    ...chartDays.map(d => calculateDayTotals(d.meals).calories)
  );

  return (
    <div className="weekly-chart fade-in">
      <h3 className="weekly-chart__title">Calorie Trend</h3>
      <div className="weekly-chart__container">
        
        {/* Goal Line */}
        <div 
          className="weekly-chart__goal-line"
          style={{ bottom: `${(goal.calories / maxCal) * 100}%` }}
        >
          <span className="weekly-chart__goal-label">Goal {goal.calories}</span>
        </div>

        {/* Bars */}
        <div className="weekly-chart__bars">
          {chartDays.map((day, i) => {
            const totals = calculateDayTotals(day.meals);
            const heightPct = Math.min((totals.calories / maxCal) * 100, 100);
            const isOver = totals.calories > goal.calories;

            // Simple day abbreviation (e.g. "Mon")
            const dayAbbr = day.label === 'Today' ? 'Today' : 
                            day.label === 'Yesterday' ? 'Yest' : 
                            day.label.substring(0, 3);

            return (
              <div key={day.dateKey} className="weekly-chart__bar-group">
                <div className="weekly-chart__bar-wrapper">
                  <div 
                    className={`weekly-chart__bar ${isOver ? 'weekly-chart__bar--over' : ''}`}
                    style={{ 
                      height: `${heightPct}%`,
                      animationDelay: `${i * 50}ms` 
                    }}
                  />
                </div>
                <span className={`weekly-chart__day-label ${day.label === 'Today' ? 'weekly-chart__day-label--today' : ''}`}>
                  {dayAbbr}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default WeeklyChart;
