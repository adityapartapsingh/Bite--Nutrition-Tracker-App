import React, { useState, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import './AiScanner.css'; // We'll add some specific scanner styles

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:3001';

function AiScanner({ onAddItems, onCancel }) {
  const { token } = useAuth();
  const fileInputRef = useRef(null);
  
  const [imagePreview, setImagePreview] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  // Multi-select state
  const [selectedIndices, setSelectedIndices] = useState(new Set());
  const [targetMeal, setTargetMeal] = useState('breakfast');

  const MEALS = [
    { id: 'breakfast', label: 'Breakfast', icon: '🌅' },
    { id: 'lunch', label: 'Lunch', icon: '☀️' },
    { id: 'dinner', label: 'Dinner', icon: '🌙' },
    { id: 'snacks', label: 'Snacks', icon: '🍿' },
  ];

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Reset state
    setError(null);
    setResults(null);
    setSelectedIndices(new Set());

    // Show preview immediately
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target.result);
      // Automatically start scan once preview is loaded
      startScan(file);
    };
    reader.readAsDataURL(file);
  };

  const startScan = async (file) => {
    setIsScanning(true);
    
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch(`${API_BASE}/api/ai/scan`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'Failed to scan image');
      }

      setResults(data.foods);
      
      // Auto-select all if foods are found
      if (data.foods && data.foods.length > 0) {
        const initialSelection = new Set(data.foods.map((_, i) => i));
        setSelectedIndices(initialSelection);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsScanning(false);
    }
  };

  const toggleSelection = (index) => {
    setSelectedIndices(prev => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  const handleAddSelected = () => {
    if (!results) return;
    const selectedFoods = results.filter((_, index) => selectedIndices.has(index));
    onAddItems(selectedFoods, targetMeal);
  };

  return (
    <div className="ai-scanner">
      {/* 1. Initial State: Upload Button */}
      {!imagePreview && (
        <div className="ai-scanner__upload-box fade-in-up">
          <div className="ai-scanner__icon-large">✨📸</div>
          <h3>AI Meal Scanner</h3>
          <p>Snap a photo of your plate and let AI instantly calculate the macros and calories.</p>
          
          <button 
            className="ai-scanner__upload-btn"
            onClick={() => fileInputRef.current?.click()}
          >
            Take Photo / Upload
          </button>
          
          {/* Hidden file input supporting mobile camera capture */}
          <input 
            type="file" 
            ref={fileInputRef}
            accept="image/*"
            capture="environment"
            onChange={handleImageSelect}
            style={{ display: 'none' }}
          />
        </div>
      )}

      {/* 2. Image Preview & Scanning State */}
      {imagePreview && !results && !error && (
        <div className="ai-scanner__preview-container fade-in">
          <img src={imagePreview} alt="Meal preview" className="ai-scanner__preview-image" />
          
          {isScanning && (
            <div className="ai-scanner__scan-overlay">
              <div className="ai-scanner__laser" />
              <div className="ai-scanner__scan-text">
                <span className="app-loading__spinner" style={{ width: '20px', height: '20px', borderWidth: '2px', borderColor: 'rgba(255,255,255,0.2)', borderTopColor: '#fff', margin: 0 }}></span>
                Analyzing food...
              </div>
            </div>
          )}
        </div>
      )}

      {/* 3. Error State */}
      {error && (
        <div className="ai-scanner__error fade-in">
          <div className="add-food__error">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <span>{error}</span>
          </div>
          <button className="goal-settings__cancel" onClick={() => setImagePreview(null)}>
            Try Again
          </button>
        </div>
      )}

      {/* 4. Results State */}
      {results && !error && (
        <div className="ai-scanner__results fade-in-up">
          {results.length === 0 ? (
            <div className="ai-scanner__empty">
              <span>🍽️</span>
              <p>We couldn't identify any food in this image. Try a clearer photo!</p>
              <button className="goal-settings__cancel" onClick={() => setImagePreview(null)} style={{ marginTop: '12px' }}>
                Try Again
              </button>
            </div>
          ) : (
            <>
              <div className="ai-scanner__results-header">
                <h3>Identified Foods</h3>
                <span className="ai-scanner__results-count">{selectedIndices.size} selected</span>
              </div>
              
              <div className="ai-scanner__results-list">
                {results.map((food, index) => {
                  const isSelected = selectedIndices.has(index);
                  return (
                    <div 
                      key={index} 
                      className={`ai-scanner__result-item ${isSelected ? 'ai-scanner__result-item--selected' : ''}`}
                      onClick={() => toggleSelection(index)}
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <div className="ai-scanner__checkbox">
                        {isSelected && (
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        )}
                      </div>
                      <div className="ai-scanner__result-info">
                        <div className="ai-scanner__result-name">{food.name}</div>
                        <div className="ai-scanner__result-serving">{food.servingSize}</div>
                      </div>
                      <div className="ai-scanner__result-macros">
                        <div className="ai-scanner__result-cals">{Math.round(food.calories)} kcal</div>
                        <div className="ai-scanner__result-macros-row">
                          <span style={{ color: 'var(--accent-blue)' }}>P{Math.round(food.protein)}</span>
                          <span style={{ color: 'var(--accent-orange)' }}>F{Math.round(food.fat)}</span>
                          <span style={{ color: 'var(--accent-purple)' }}>C{Math.round(food.carbs)}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="manual-entry__meal-select" style={{ marginBottom: '16px' }}>
                <h3 className="manual-entry__meal-title">Add To</h3>
                <div className="manual-entry__meal-options">
                  {MEALS.map(meal => (
                    <button
                      key={meal.id}
                      type="button"
                      className={`manual-entry__meal-btn ${targetMeal === meal.id ? 'manual-entry__meal-btn--active' : ''}`}
                      onClick={() => setTargetMeal(meal.id)}
                    >
                      <span className="manual-entry__meal-icon">{meal.icon}</span>
                      <span>{meal.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="ai-scanner__actions">
                <button className="goal-settings__cancel" onClick={() => setImagePreview(null)}>
                  Discard
                </button>
                <button 
                  className="goal-settings__save" 
                  onClick={handleAddSelected}
                  disabled={selectedIndices.size === 0}
                >
                  Add Selected to Meal
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default AiScanner;
