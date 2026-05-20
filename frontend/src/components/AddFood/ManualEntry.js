import React, { useState } from 'react';
import { useNutrition } from '../../context/NutritionContext';
import { getTodayKey } from '../../utils/nutrition';

function ManualEntry({ initialMeal }) {
  const { addFood } = useNutrition();
  const [mealType, setMealType] = useState(initialMeal || 'breakfast');
  
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    servingSize: '1 serving',
    servingSizeG: '',
    calories: '',
    protein: '',
    fat: '',
    carbs: ''
  });

  const [error, setError] = useState('');

  const MEALS = [
    { id: 'breakfast', label: 'Breakfast', icon: '🌅' },
    { id: 'lunch', label: 'Lunch', icon: '☀️' },
    { id: 'dinner', label: 'Dinner', icon: '🌙' },
    { id: 'snacks', label: 'Snacks', icon: '🍿' },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      setError('Food name is required');
      return;
    }
    
    if (!formData.calories) {
      setError('Calories are required');
      return;
    }

    const foodItem = {
      name: formData.name.trim(),
      brand: formData.brand.trim() || null,
      servingSize: formData.servingSize.trim() || '1 serving',
      servingSizeG: formData.servingSizeG ? parseFloat(formData.servingSizeG) : null,
      calories: parseFloat(formData.calories) || 0,
      protein: parseFloat(formData.protein) || 0,
      fat: parseFloat(formData.fat) || 0,
      carbs: parseFloat(formData.carbs) || 0,
      quantity: 1,
      isManual: true
    };

    addFood(getTodayKey(), mealType, foodItem);
    
    // Reset form
    setFormData({
      name: '',
      brand: '',
      servingSize: '1 serving',
      servingSizeG: '',
      calories: '',
      protein: '',
      fat: '',
      carbs: ''
    });
    
    // Show some success indication (parent might unmount this or show toast)
  };

  return (
    <div className="manual-entry">
      <form className="manual-entry__form" onSubmit={handleSubmit}>
        <div className="manual-entry__field">
          <label className="manual-entry__label" htmlFor="manual-name">Food Name *</label>
          <input
            id="manual-name"
            name="name"
            className="manual-entry__input"
            placeholder="e.g., Homemade Dal"
            value={formData.name}
            onChange={handleChange}
            autoFocus
          />
        </div>

        <div className="manual-entry__row">
          <div className="manual-entry__field">
            <label className="manual-entry__label" htmlFor="manual-brand">Brand (Optional)</label>
            <input
              id="manual-brand"
              name="brand"
              className="manual-entry__input"
              placeholder="e.g., Mother's Recipe"
              value={formData.brand}
              onChange={handleChange}
            />
          </div>
          <div className="manual-entry__field">
            <label className="manual-entry__label" htmlFor="manual-serving">Serving Size</label>
            <input
              id="manual-serving"
              name="servingSize"
              className="manual-entry__input"
              placeholder="e.g., 1 bowl"
              value={formData.servingSize}
              onChange={handleChange}
            />
          </div>
        </div>

        <h3 className="manual-entry__macros-title">Nutrition per serving</h3>
        
        <div className="manual-entry__row">
          <div className="manual-entry__field">
            <label className="manual-entry__label" htmlFor="manual-cals">Calories *</label>
            <input
              id="manual-cals"
              name="calories"
              type="number"
              min="0"
              className="manual-entry__input"
              placeholder="kcal"
              value={formData.calories}
              onChange={handleChange}
            />
          </div>
          <div className="manual-entry__field">
            <label className="manual-entry__label" htmlFor="manual-protein">Protein</label>
            <input
              id="manual-protein"
              name="protein"
              type="number"
              min="0"
              step="0.1"
              className="manual-entry__input"
              placeholder="g"
              value={formData.protein}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="manual-entry__row">
          <div className="manual-entry__field">
            <label className="manual-entry__label" htmlFor="manual-fat">Fat</label>
            <input
              id="manual-fat"
              name="fat"
              type="number"
              min="0"
              step="0.1"
              className="manual-entry__input"
              placeholder="g"
              value={formData.fat}
              onChange={handleChange}
            />
          </div>
          <div className="manual-entry__field">
            <label className="manual-entry__label" htmlFor="manual-carbs">Carbs</label>
            <input
              id="manual-carbs"
              name="carbs"
              type="number"
              min="0"
              step="0.1"
              className="manual-entry__input"
              placeholder="g"
              value={formData.carbs}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="manual-entry__meal-select">
          <h3 className="manual-entry__meal-title">Add To</h3>
          <div className="manual-entry__meal-options">
            {MEALS.map(meal => (
              <button
                key={meal.id}
                type="button"
                className={`manual-entry__meal-btn ${mealType === meal.id ? 'manual-entry__meal-btn--active' : ''}`}
                onClick={() => setMealType(meal.id)}
              >
                <span className="manual-entry__meal-icon">{meal.icon}</span>
                <span>{meal.label}</span>
              </button>
            ))}
          </div>
        </div>

        {error && <div className="manual-entry__error">{error}</div>}

        <button 
          type="submit" 
          className="manual-entry__submit"
          disabled={!formData.name || !formData.calories}
        >
          Add to Diary
        </button>
      </form>
    </div>
  );
}

export default ManualEntry;
