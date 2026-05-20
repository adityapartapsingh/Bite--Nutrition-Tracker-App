import React, { useState } from 'react';
import { useNutrition } from '../../context/NutritionContext';

function GoalSettings({ onClose }) {
  const { state, updateGoals } = useNutrition();
  const [goals, setGoals] = useState({ ...state.dailyGoal });

  const handleChange = (key, value) => {
    const num = parseInt(value, 10);
    if (!isNaN(num) && num >= 0) {
      setGoals((prev) => ({ ...prev, [key]: num }));
    }
  };

  const handleSave = () => {
    updateGoals(goals);
    onClose();
  };

  const fields = [
    { key: 'calories', label: 'Daily Calories', unit: 'kcal', icon: '🔥', step: 50 },
    { key: 'protein', label: 'Protein', unit: 'g', icon: '💪', step: 5 },
    { key: 'fat', label: 'Fat', unit: 'g', icon: '🫧', step: 5 },
    { key: 'carbs', label: 'Carbs', unit: 'g', icon: '⚡', step: 5 },
  ];

  return (
    <div className="goal-settings-overlay" id="goal-settings-overlay" onClick={onClose}>
      <div
        className="goal-settings"
        id="goal-settings-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="goal-settings__header">
          <h2 className="goal-settings__title">Daily Goals</h2>
          <button
            className="goal-settings__close"
            id="goal-close-btn"
            onClick={onClose}
            aria-label="Close"
            type="button"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="goal-settings__fields">
          {fields.map(({ key, label, unit, icon, step }) => (
            <div key={key} className="goal-settings__field">
              <div className="goal-settings__field-label">
                <span className="goal-settings__field-icon">{icon}</span>
                <span>{label}</span>
              </div>
              <div className="goal-settings__field-controls">
                <button
                  className="goal-settings__step-btn"
                  onClick={() => handleChange(key, Math.max(0, goals[key] - step))}
                  type="button"
                  aria-label={`Decrease ${label}`}
                >−</button>
                <div className="goal-settings__input-wrapper">
                  <input
                    className="goal-settings__input"
                    id={`goal-input-${key}`}
                    type="number"
                    min="0"
                    step={step}
                    value={goals[key]}
                    onChange={(e) => handleChange(key, e.target.value)}
                  />
                  <span className="goal-settings__unit">{unit}</span>
                </div>
                <button
                  className="goal-settings__step-btn"
                  onClick={() => handleChange(key, goals[key] + step)}
                  type="button"
                  aria-label={`Increase ${label}`}
                >+</button>
              </div>
            </div>
          ))}
        </div>

        <div className="goal-settings__actions">
          <button
            className="goal-settings__cancel"
            id="goal-cancel-btn"
            onClick={onClose}
            type="button"
          >Cancel</button>
          <button
            className="goal-settings__save"
            id="goal-save-btn"
            onClick={handleSave}
            type="button"
          >Save Goals</button>
        </div>
      </div>
    </div>
  );
}

export default GoalSettings;
