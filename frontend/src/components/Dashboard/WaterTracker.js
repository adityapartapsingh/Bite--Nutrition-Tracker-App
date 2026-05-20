import React from 'react';
import { useNutrition } from '../../context/NutritionContext';
import { getTodayKey } from '../../utils/nutrition';
import './WaterTracker.css';

function WaterTracker() {
  const { state, addWater, removeWater } = useNutrition();
  const today = getTodayKey();
  
  // Wait for state load
  if (!state) return null;

  const currentWater = state.waterIntake[today] || 0;
  const waterGoal = state.dailyGoal.waterGoal || 8;
  const progress = Math.min((currentWater / waterGoal) * 100, 100);

  return (
    <div className="water-tracker scale-in">
      <div className="water-tracker__header">
        <div className="water-tracker__info">
          <h3 className="water-tracker__title">Daily Water</h3>
          <span className="water-tracker__subtitle">
            {currentWater} of {waterGoal} glasses
          </span>
        </div>
        <div className="water-tracker__controls">
          <button 
            className="water-tracker__btn water-tracker__btn--remove"
            onClick={() => removeWater(today)}
            disabled={currentWater === 0}
            aria-label="Remove a glass"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </button>
          <button 
            className="water-tracker__btn water-tracker__btn--add"
            onClick={() => addWater(today)}
            aria-label="Add a glass"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </button>
        </div>
      </div>
      
      <div className="water-tracker__progress-bg">
        <div 
          className={`water-tracker__progress-fill ${progress >= 100 ? 'water-tracker__progress-fill--complete' : ''}`}
          style={{ width: `${progress}%` }}
        >
          {progress > 0 && <div className="water-tracker__bubbles" />}
        </div>
      </div>
    </div>
  );
}

export default WaterTracker;
