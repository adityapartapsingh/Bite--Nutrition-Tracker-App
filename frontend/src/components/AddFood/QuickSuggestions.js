import React from 'react';
import { getCategoryColor } from '../../utils/popularFoods';

function QuickSuggestions({ query, suggestions, recent, onSelect, onQuickAdd, visible }) {
  if (!visible) return null;
  if (!suggestions?.length && !recent?.length) return null;

  return (
    <div className="quick-suggest fade-in-up" id="quick-suggest-dropdown">
      <div className="quick-suggest__list">
        
        {/* Recent Foods */}
        {recent?.length > 0 && (
          <div className="quick-suggest__section">
            <div className="quick-suggest__section-title">Recent</div>
            {recent.slice(0, 4).map((food, i) => (
              <div 
                key={`recent-${food.id || food.name}-${i}`} 
                className="quick-suggest__item"
                style={{ animationDelay: `${i * 30}ms` }}
                onClick={() => onSelect(food)}
              >
                <div className="quick-suggest__item-dot" style={{ backgroundColor: getCategoryColor('recent') }} />
                <div className="quick-suggest__item-info">
                  <span className="quick-suggest__item-name">{food.name}</span>
                  <span className="quick-suggest__item-meta">
                    {food.brand ? `${food.brand} • ` : ''}{food.servingSize}
                  </span>
                </div>
                <span className="quick-suggest__item-cals">{Math.round(food.calories)} kcal</span>
                <button 
                  className="quick-suggest__quick-add"
                  onClick={(e) => {
                    e.stopPropagation();
                    onQuickAdd(food);
                  }}
                  title="Quick Add"
                >
                  ⚡
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Popular Suggestions */}
        {suggestions?.length > 0 && (
          <div className="quick-suggest__section">
            <div className="quick-suggest__section-title">Suggestions</div>
            {suggestions.map((food, i) => (
              <div 
                key={`suggest-${food.name}-${i}`} 
                className="quick-suggest__item"
                style={{ animationDelay: `${(recent?.length || 0 + i) * 30}ms` }}
                onClick={() => onSelect(food)}
              >
                <div className="quick-suggest__item-dot" style={{ backgroundColor: getCategoryColor(food.category) }} />
                <div className="quick-suggest__item-info">
                  <span className="quick-suggest__item-name">
                    {highlightMatch(food.name, query)}
                  </span>
                  <span className="quick-suggest__item-meta">
                    {food.servingSize}
                  </span>
                </div>
                <span className="quick-suggest__item-cals">{Math.round(food.calories)} kcal</span>
                <button 
                  className="quick-suggest__quick-add"
                  onClick={(e) => {
                    e.stopPropagation();
                    onQuickAdd(food);
                  }}
                  title="Quick Add"
                >
                  ⚡
                </button>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

// Helper to highlight matching text
function highlightMatch(text, query) {
  if (!query) return text;
  
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  const parts = text.split(regex);
  
  return parts.map((part, i) => 
    regex.test(part) ? <mark key={i}>{part}</mark> : <span key={i}>{part}</span>
  );
}

export default QuickSuggestions;
