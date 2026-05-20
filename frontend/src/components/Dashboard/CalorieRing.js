import React, { useEffect, useState } from 'react';

function CalorieRing({ consumed, goal }) {
  const [animatedOffset, setAnimatedOffset] = useState(0);

  const size = 200;
  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const percentage = goal > 0 ? Math.min((consumed / goal) * 100, 150) : 0;
  const displayPercentage = Math.round(percentage);
  const offset = circumference - (Math.min(percentage, 100) / 100) * circumference;

  // Determine color based on percentage
  let ringColor = '#4ade80'; // green
  let ringGlow = 'rgba(74, 222, 128, 0.3)';
  let gradientId = 'ring-gradient-green';

  if (percentage > 100) {
    ringColor = '#f87171';
    ringGlow = 'rgba(248, 113, 113, 0.3)';
    gradientId = 'ring-gradient-red';
  } else if (percentage >= 80) {
    ringColor = '#fbbf24';
    ringGlow = 'rgba(251, 191, 36, 0.3)';
    gradientId = 'ring-gradient-yellow';
  }

  useEffect(() => {
    // Start from full circumference (empty) and animate to target
    setAnimatedOffset(circumference);
    const timer = setTimeout(() => {
      setAnimatedOffset(offset);
    }, 100);
    return () => clearTimeout(timer);
  }, [offset, circumference]);

  const remaining = Math.max(0, goal - consumed);

  return (
    <div className="calorie-ring" id="calorie-ring">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="calorie-ring__svg"
      >
        <defs>
          <linearGradient id="ring-gradient-green" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4ade80" />
            <stop offset="100%" stopColor="#2dd4bf" />
          </linearGradient>
          <linearGradient id="ring-gradient-yellow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>
          <linearGradient id="ring-gradient-red" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f87171" />
            <stop offset="100%" stopColor="#ef4444" />
          </linearGradient>
          <filter id="ring-glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Background ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255, 255, 255, 0.06)"
          strokeWidth={strokeWidth}
        />

        {/* Progress ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={animatedOffset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{
            transition: 'stroke-dashoffset 1s cubic-bezier(0.4, 0, 0.2, 1)',
            filter: `drop-shadow(0 0 6px ${ringGlow})`,
          }}
        />
      </svg>

      <div className="calorie-ring__content">
        <span className="calorie-ring__value">{Math.round(consumed)}</span>
        <span className="calorie-ring__label">/ {goal} kcal</span>
        <span
          className="calorie-ring__percentage"
          style={{ color: ringColor }}
        >
          {displayPercentage}%
        </span>
      </div>

      <div className="calorie-ring__remaining">
        {consumed <= goal ? (
          <span>{Math.round(remaining)} kcal remaining</span>
        ) : (
          <span className="calorie-ring__over">
            {Math.round(consumed - goal)} kcal over
          </span>
        )}
      </div>
    </div>
  );
}

export default CalorieRing;
