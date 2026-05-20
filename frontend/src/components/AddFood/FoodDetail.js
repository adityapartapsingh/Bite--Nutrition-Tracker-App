import React, { useState, useMemo } from 'react';

const NUTRIENT_ROWS = [
  { key: 'calories', label: 'Calories', unit: 'kcal', color: 'var(--accent-green)' },
  { key: 'protein', label: 'Protein', unit: 'g', color: 'var(--accent-blue)' },
  { key: 'fat', label: 'Total Fat', unit: 'g', color: 'var(--accent-orange)' },
  { key: 'saturatedFat', label: 'Saturated Fat', unit: 'g', color: 'var(--accent-orange)', indent: true },
  { key: 'carbs', label: 'Carbohydrates', unit: 'g', color: 'var(--accent-purple)' },
  { key: 'sugar', label: 'Sugar', unit: 'g', color: 'var(--accent-pink)', indent: true },
  { key: 'fiber', label: 'Fiber', unit: 'g', color: 'var(--accent-teal)', indent: true },
  { key: 'sodium', label: 'Sodium', unit: 'g', color: 'var(--text-secondary)' },
];

const MEAL_OPTIONS = [
  { value: 'breakfast', label: 'Breakfast', icon: '🌅' },
  { value: 'lunch', label: 'Lunch', icon: '☀️' },
  { value: 'dinner', label: 'Dinner', icon: '🌙' },
  { value: 'snacks', label: 'Snacks', icon: '🍿' },
];

function FoodDetail({ food, onClose, onAdd, initialMeal }) {
  const [quantity, setQuantity] = useState(1);
  const [selectedMeal, setSelectedMeal] = useState(initialMeal || 'breakfast');

  const scaledFood = useMemo(() => {
    const scaled = {};
    NUTRIENT_ROWS.forEach(({ key }) => {
      scaled[key] = Math.round(((food[key] || 0) * quantity) * 10) / 10;
    });
    return scaled;
  }, [food, quantity]);

  const handleQuantityChange = (val) => {
    const num = parseFloat(val);
    if (!isNaN(num) && num >= 0.1 && num <= 99) {
      setQuantity(num);
    }
  };

  const handleAdd = () => {
    onAdd(food, selectedMeal, quantity);
  };

  return (
    <div className="food-detail-overlay" id="food-detail-overlay" onClick={onClose}>
      <div
        className="food-detail"
        id="food-detail-modal"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="food-detail__header">
          <div className="food-detail__header-info">
            <h2 className="food-detail__name">{food.name}</h2>
            {food.brand && (
              <span className="food-detail__brand">{food.brand}</span>
            )}
          </div>
          <button
            className="food-detail__close"
            id="food-detail-close"
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

        {/* Serving / Quantity */}
        <div className="food-detail__serving">
          <span className="food-detail__serving-label">Serving</span>
          <span className="food-detail__serving-value">
            {food.servingSize || `${food.servingSizeG || 100}g`}
          </span>
        </div>

        <div className="food-detail__quantity">
          <span className="food-detail__quantity-label">Quantity</span>
          <div className="food-detail__quantity-controls">
            <button
              className="food-detail__qty-btn"
              id="qty-decrease"
              onClick={() => handleQuantityChange(Math.max(0.5, quantity - 0.5))}
              type="button"
              aria-label="Decrease quantity"
            >−</button>
            <input
              className="food-detail__qty-input"
              id="qty-input"
              type="number"
              min="0.1"
              max="99"
              step="0.5"
              value={quantity}
              onChange={(e) => handleQuantityChange(e.target.value)}
            />
            <button
              className="food-detail__qty-btn"
              id="qty-increase"
              onClick={() => handleQuantityChange(Math.min(99, quantity + 0.5))}
              type="button"
              aria-label="Increase quantity"
            >+</button>
          </div>
        </div>

        {/* Nutrition Breakdown */}
        <div className="food-detail__nutrients">
          <h3 className="food-detail__nutrients-title">Nutrition Facts</h3>
          {NUTRIENT_ROWS.map(({ key, label, unit, color, indent }) => (
            <div
              key={key}
              className={`food-detail__nutrient-row ${indent ? 'food-detail__nutrient-row--indent' : ''}`}
            >
              <span className="food-detail__nutrient-label">
                <span
                  className="food-detail__nutrient-dot"
                  style={{ backgroundColor: color }}
                />
                {label}
              </span>
              <span className="food-detail__nutrient-value">
                {scaledFood[key]} {unit}
              </span>
            </div>
          ))}
        </div>

        {/* Meal Selector */}
        <div className="food-detail__meal-select">
          <h3 className="food-detail__meal-title">Add to meal</h3>
          <div className="food-detail__meal-options">
            {MEAL_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                className={`food-detail__meal-btn ${selectedMeal === opt.value ? 'food-detail__meal-btn--active' : ''}`}
                id={`meal-option-${opt.value}`}
                onClick={() => setSelectedMeal(opt.value)}
                type="button"
              >
                <span className="food-detail__meal-icon">{opt.icon}</span>
                <span className="food-detail__meal-label">{opt.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Add Button */}
        <button
          className="food-detail__add-btn"
          id="add-to-meal-btn"
          onClick={handleAdd}
          type="button"
        >
          Add to {MEAL_OPTIONS.find((m) => m.value === selectedMeal)?.label}
        </button>
      </div>
    </div>
  );
}

export default FoodDetail;
