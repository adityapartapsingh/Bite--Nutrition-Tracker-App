import React from 'react';

function MacroBar({ label, current, goal, gradient, icon, accentColor }) {
  const percentage = goal > 0 ? Math.min((current / goal) * 100, 100) : 0;
  const isOver = current > goal;

  return (
    <div className="macro-bar" id={`macro-bar-${label.toLowerCase()}`}>
      <div className="macro-bar__header">
        <div className="macro-bar__label-group">
          <span className="macro-bar__icon">{icon}</span>
          <span className="macro-bar__label">{label}</span>
        </div>
        <span className="macro-bar__values">
          <span className="macro-bar__current" style={{ color: accentColor }}>
            {Math.round(current)}g
          </span>
          <span className="macro-bar__separator">/</span>
          <span className="macro-bar__goal">{goal}g</span>
        </span>
      </div>

      <div className="macro-bar__track">
        <div
          className={`macro-bar__fill ${isOver ? 'macro-bar__fill--over' : ''}`}
          style={{
            width: `${percentage}%`,
            background: isOver
              ? 'var(--gradient-danger)'
              : gradient,
          }}
        />
      </div>
    </div>
  );
}

export default MacroBar;
