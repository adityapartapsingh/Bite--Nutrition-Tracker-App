import React, { useState, useCallback } from 'react';
import './AddFood.css';
import SearchBar from './SearchBar';
import BarcodeScanner from './BarcodeScanner';
import FoodCard from './FoodCard';
import FoodDetail from './FoodDetail';
import QuickSuggestions from './QuickSuggestions';
import ManualEntry from './ManualEntry';
import AiScanner from './AiScanner';
import { searchFood, lookupBarcode } from '../../services/api';
import { useNutrition } from '../../context/NutritionContext';
import { searchPopularFoods } from '../../utils/popularFoods';

function AddFood({ initialMeal }) {
  const { state, addFood } = useNutrition();
  const [activeSubTab, setActiveSubTab] = useState('search');
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedFood, setSelectedFood] = useState(null);
  const [scannerActive, setScannerActive] = useState(false);
  const [recentlyAdded, setRecentlyAdded] = useState([]);
  const [toast, setToast] = useState(null);
  
  const [searchFocused, setSearchFocused] = useState(false);
  const [suggestedFoods, setSuggestedFoods] = useState([]);

  const [debounceTimer, setDebounceTimer] = useState(null);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 2200);
  };

  const handleSearchChange = useCallback((value) => {
    setSearchQuery(value);
    setError(null);

    const popularMatches = searchPopularFoods(value);
    setSuggestedFoods(popularMatches);

    if (debounceTimer) clearTimeout(debounceTimer);

    if (!value.trim()) {
      setResults([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const timer = setTimeout(async () => {
      try {
        const foods = await searchFood(value);
        setResults(foods);
        setError(null);
      } catch (err) {
        setError(err.message || 'Search failed. Please try again.');
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 300);

    setDebounceTimer(timer);
  }, [debounceTimer]);

  const handleSearchClear = () => {
    setSearchQuery('');
    setResults([]);
    setSuggestedFoods([]);
    setError(null);
    setLoading(false);
    if (debounceTimer) clearTimeout(debounceTimer);
  };

  const handleScanSuccess = async (barcode) => {
    setScannerActive(false);
    setLoading(true);
    setError(null);
    try {
      const food = await lookupBarcode(barcode);
      setSelectedFood(food);
    } catch (err) {
      setError(err.message || 'Product not found. Try searching instead.');
    } finally {
      setLoading(false);
    }
  };

  const handleScanError = (err) => {
    console.warn('Scan error:', err);
  };

  const handleFoodSelect = (food) => {
    setSelectedFood(food);
  };

  const MEAL_LABELS = { breakfast: 'Breakfast', lunch: 'Lunch', dinner: 'Dinner', snacks: 'Snacks' };

  const handleAddToMeal = (food, mealType, quantity) => {
    const foodToAdd = { ...food, quantity };
    addFood(state.selectedDate, mealType, foodToAdd);
    setRecentlyAdded((prev) => [
      { ...food, quantity, mealType, addedAt: Date.now() },
      ...prev.slice(0, 4),
    ]);
    showToast(`Added ${food.name} to ${MEAL_LABELS[mealType] || mealType}`);
    setSelectedFood(null);
  };

  const handleTabSwitch = (tab) => {
    setActiveSubTab(tab);
    setScannerActive(tab === 'scan');
  };

  // Get today's logged items from context
  const dayLog = state.logs[state.selectedDate] || {};
  const allLoggedItems = [];
  ['breakfast', 'lunch', 'dinner', 'snacks'].forEach((meal) => {
    (dayLog[meal] || []).forEach((food) => {
      allLoggedItems.push({ ...food, mealType: meal });
    });
  });

  return (
    <div className="add-food" id="add-food-view">
      <h1 className="add-food__title">Add Food</h1>

      {/* Tab Switcher */}
      <div className="add-food__tabs" id="add-food-tabs">
        <button
          className={`add-food__tab ${activeSubTab === 'search' ? 'add-food__tab--active' : ''}`}
          id="tab-search"
          onClick={() => handleTabSwitch('search')}
          type="button"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          Search
        </button>
        <button
          className={`add-food__tab ${activeSubTab === 'scan' ? 'add-food__tab--active' : ''}`}
          id="tab-scan"
          onClick={() => handleTabSwitch('scan')}
          type="button"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <line x1="6" y1="8" x2="6" y2="16" />
            <line x1="10" y1="8" x2="10" y2="16" />
            <line x1="14" y1="8" x2="14" y2="16" />
            <line x1="18" y1="8" x2="18" y2="16" />
          </svg>
          Scan
        </button>
        <button
          className={`add-food__tab ${activeSubTab === 'ai' ? 'add-food__tab--active' : ''}`}
          id="tab-ai"
          onClick={() => handleTabSwitch('ai')}
          type="button"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
          </svg>
          AI Scan
        </button>
        <button
          className={`add-food__tab ${activeSubTab === 'manual' ? 'add-food__tab--active' : ''}`}
          id="tab-manual"
          onClick={() => handleTabSwitch('manual')}
          type="button"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 20h9" />
            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
          </svg>
          Manual
        </button>
      </div>

      {/* Recently added in this session */}
      {recentlyAdded.length > 0 && (
        <div className="add-food__recent" id="recently-added">
          <h3 className="add-food__recent-title">Just added</h3>
          <div className="add-food__recent-list">
            {recentlyAdded.map((item, i) => (
              <div key={`recent-${i}`} className="add-food__recent-item">
                <span className="add-food__recent-check">✓</span>
                <div className="add-food__recent-info">
                  <span className="add-food__recent-name">{item.name}</span>
                  <span className="add-food__recent-meal">{MEAL_LABELS[item.mealType]}</span>
                </div>
                <span className="add-food__recent-cals">{Math.round((item.calories || 0) * (item.quantity || 1))} kcal</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Search Tab */}
      {activeSubTab === 'search' && (
        <div className="add-food__search-panel">
          <SearchBar
            value={searchQuery}
            onChange={handleSearchChange}
            onClear={handleSearchClear}
            loading={loading}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
          />

          <QuickSuggestions 
            visible={searchFocused && (!searchQuery.trim() || (searchQuery.trim() && results.length === 0))}
            query={searchQuery}
            recent={!searchQuery.trim() ? state.recentFoods : null}
            suggestions={suggestedFoods}
            onSelect={handleFoodSelect}
            onQuickAdd={(food) => handleAddToMeal(food, initialMeal || 'breakfast', 1)}
          />

          {error && (
            <div className="add-food__error" id="search-error">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          {!loading && !error && results.length === 0 && searchQuery.trim() && !searchFocused && (
            <div className="add-food__empty" id="search-empty">
              <span className="add-food__empty-icon">🔍</span>
              <p>No results found for "{searchQuery}"</p>
              <p className="add-food__empty-hint">Try a different search term</p>
            </div>
          )}

          {!loading && !error && results.length === 0 && !searchQuery.trim() && !searchFocused && (
            <div className="add-food__search-prompt" id="search-prompt">
              
              {/* Frequently Logged Chips */}
              {state.recentFoods?.length > 0 && (
                <div className="add-food__frequent">
                  <h3 className="add-food__frequent-title">Frequently Logged</h3>
                  <div className="add-food__frequent-scroll">
                    {state.recentFoods.slice(0, 8).map((food, i) => (
                      <div 
                        key={`freq-${i}`} 
                        className="add-food__frequent-chip"
                        onClick={() => handleFoodSelect(food)}
                      >
                        <span className="add-food__frequent-chip-name">{food.name}</span>
                        <span className="add-food__frequent-chip-cals">{Math.round(food.calories)} kcal</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <span className="add-food__search-prompt-icon">🍎</span>
              <p className="add-food__search-prompt-text">Search for any food</p>
              <p className="add-food__search-prompt-hint">Try "chicken breast" or "200g rice"</p>

              {/* Show today's logged items when no search query */}
              {allLoggedItems.length > 0 && (
                <div className="add-food__today-log">
                  <h3 className="add-food__today-title">Today's log ({allLoggedItems.length} items)</h3>
                  <div className="add-food__today-list">
                    {allLoggedItems.map((item, i) => (
                      <div key={`logged-${i}`} className="add-food__today-item">
                        <div className="add-food__today-item-info">
                          <span className="add-food__today-item-name">{item.name}</span>
                          <span className="add-food__today-item-meal">{MEAL_LABELS[item.mealType]}</span>
                        </div>
                        <div className="add-food__today-item-stats">
                          <span className="add-food__today-item-cals">{Math.round((item.calories || 0) * (item.quantity || 1))} kcal</span>
                          <div className="add-food__today-item-macros">
                            <span className="add-food__today-macro add-food__today-macro--p">P{Math.round((item.protein || 0) * (item.quantity || 1))}</span>
                            <span className="add-food__today-macro add-food__today-macro--f">F{Math.round((item.fat || 0) * (item.quantity || 1))}</span>
                            <span className="add-food__today-macro add-food__today-macro--c">C{Math.round((item.carbs || 0) * (item.quantity || 1))}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="add-food__results" id="search-results">
            {results.map((food, index) => (
              <FoodCard
                key={`${food.name}-${index}`}
                food={food}
                onClick={() => handleFoodSelect(food)}
                style={{ animationDelay: `${index * 60}ms` }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Scan Tab */}
      {activeSubTab === 'scan' && (
        <div className="add-food__scan-panel">
          <BarcodeScanner
            active={scannerActive}
            onScanSuccess={handleScanSuccess}
            onScanError={handleScanError}
          />
          {loading && (
            <div className="add-food__scan-loading">
              <div className="add-food__spinner" />
              <p>Looking up product...</p>
            </div>
          )}
          {error && (
            <div className="add-food__error" id="scan-error">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <span>{error}</span>
            </div>
          )}
        </div>
      )}

      {/* AI Scan Tab */}
      {activeSubTab === 'ai' && (
        <div className="add-food__ai-panel">
          <AiScanner 
            onAddItems={(items, selectedMeal) => {
              items.forEach(food => handleAddToMeal(food, selectedMeal || initialMeal || 'breakfast', 1));
              handleTabSwitch('search');
            }}
            onCancel={() => handleTabSwitch('search')}
          />
        </div>
      )}

      {/* Manual Tab */}
      {activeSubTab === 'manual' && (
        <div className="add-food__manual-panel">
          <ManualEntry initialMeal={initialMeal} />
        </div>
      )}

      {/* Food Detail Modal */}
      {selectedFood && (
        <FoodDetail
          food={selectedFood}
          onClose={() => setSelectedFood(null)}
          onAdd={handleAddToMeal}
          initialMeal={initialMeal}
        />
      )}

      {/* Toast */}
      {toast && (
        <div className="add-food__toast" id="add-toast">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          {toast}
        </div>
      )}
    </div>
  );
}

export default AddFood;
