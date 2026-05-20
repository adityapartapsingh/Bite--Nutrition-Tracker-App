import React, { useState } from 'react';
import { calculateMealTotals } from '../../utils/nutrition';

function MealSection({ title, icon, foods, mealType, onAddClick, onRemoveFood }) {
  const [isExpanded, setIsExpanded] = useState(true);
  const totals = calculateMealTotals(foods);
  const foodCount = foods ? foods.length : 0;

  return (
    <section
      className="meal-section"
      id={`meal-section-${mealType}`}
      aria-label={title}
    >
      <button
        className="meal-section__header"
        id={`meal-header-${mealType}`}
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
        type="button"
      >
        <div className="meal-section__header-left">
          <span className="meal-section__icon">{icon}</span>
          <h3 className="meal-section__title">{title}</h3>
          {foodCount > 0 && (
            <span className="meal-section__count">{foodCount}</span>
          )}
        </div>
        <div className="meal-section__header-right">
          {foodCount > 0 && (
            <span className="meal-section__calories">
              {Math.round(totals.calories)} kcal
            </span>
          )}
          <span
            className={`meal-section__chevron ${isExpanded ? 'meal-section__chevron--open' : ''}`}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </span>
        </div>
      </button>

      {isExpanded && (
        <div className="meal-section__content">
          {foodCount > 0 ? (
            <ul className="meal-section__food-list">
              {foods.map((food, index) => (
                <li
                  key={food.id || index}
                  className="meal-section__food-item"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="meal-section__food-info">
                    <span className="meal-section__food-name">{food.name}</span>
                    <span className="meal-section__food-serving">
                      {food.servingSize || food.serving_size || '1 serving'}
                      {food.quantity && food.quantity > 1
                        ? ` × ${food.quantity}`
                        : ''}
                    </span>
                  </div>
                  <div className="meal-section__food-actions">
                    <span className="meal-section__food-calories">
                      {Math.round((food.calories || 0) * (food.quantity || 1))} kcal
                    </span>
                    <button
                      className="meal-section__remove-btn"
                      id={`remove-food-${food.id || index}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        onRemoveFood(mealType, food.id);
                      }}
                      aria-label={`Remove ${food.name}`}
                      type="button"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="meal-section__empty">No foods logged yet</p>
          )}

          <button
            className="meal-section__add-btn"
            id={`add-food-${mealType}`}
            onClick={() => onAddClick(mealType)}
            type="button"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            <span>Add food</span>
          </button>
        </div>
      )}
    </section>
  );
}

export default MealSection;
