import React from 'react';

function FoodCard({ food, onClick, style }) {
  return (
    <div
      className="food-card"
      id={`food-card-${food.name?.replace(/\s+/g, '-').toLowerCase()}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter') onClick(); }}
      style={style}
    >
      <div className="food-card__info">
        <h3 className="food-card__name">{food.name}</h3>
        {food.brand && (
          <span className="food-card__brand">{food.brand}</span>
        )}
        <span className="food-card__serving">
          {food.servingSize || `${food.servingSizeG || 100}g`}
        </span>
      </div>

      <div className="food-card__macros">
        <span className="food-card__macro food-card__macro--calories">
          <span className="food-card__macro-value">{Math.round(food.calories || 0)}</span>
          <span className="food-card__macro-label">kcal</span>
        </span>
        <span className="food-card__macro food-card__macro--protein">
          <span className="food-card__macro-value">{Math.round(food.protein || 0)}g</span>
          <span className="food-card__macro-label">protein</span>
        </span>
        <span className="food-card__macro food-card__macro--fat">
          <span className="food-card__macro-value">{Math.round(food.fat || 0)}g</span>
          <span className="food-card__macro-label">fat</span>
        </span>
        <span className="food-card__macro food-card__macro--carbs">
          <span className="food-card__macro-value">{Math.round(food.carbs || 0)}g</span>
          <span className="food-card__macro-label">carbs</span>
        </span>
      </div>
    </div>
  );
}

export default FoodCard;
