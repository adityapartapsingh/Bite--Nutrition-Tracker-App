import React, { useState, useCallback } from 'react';
import './AddFood.css';
import SearchBar from './SearchBar';
import BarcodeScanner from './BarcodeScanner';
import FoodCard from './FoodCard';
import FoodDetail from './FoodDetail';
import { searchFood, lookupBarcode } from '../../services/api';
import { useNutrition } from '../../context/NutritionContext';

function AddFood({ initialMeal }) {
  const { state, addFood } = useNutrition();
  const [activeSubTab, setActiveSubTab] = useState('search');
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedFood, setSelectedFood] = useState(null);
  const [scannerActive, setScannerActive] = useState(false);

  // Debounced search
  const [debounceTimer, setDebounceTimer] = useState(null);

  const handleSearchChange = useCallback((value) => {
    setSearchQuery(value);
    setError(null);

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

  const handleAddToMeal = (food, mealType, quantity) => {
    const foodToAdd = {
      ...food,
      quantity: quantity,
    };
    addFood(state.selectedDate, mealType, foodToAdd);
    setSelectedFood(null);
  };

  const handleTabSwitch = (tab) => {
    setActiveSubTab(tab);
    if (tab === 'scan') {
      setScannerActive(true);
    } else {
      setScannerActive(false);
    }
  };

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
          Scan Barcode
        </button>
      </div>

      {/* Search Tab */}
      {activeSubTab === 'search' && (
        <div className="add-food__search-panel">
          <SearchBar
            value={searchQuery}
            onChange={handleSearchChange}
            onClear={handleSearchClear}
            loading={loading}
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

          {!loading && !error && results.length === 0 && searchQuery.trim() && (
            <div className="add-food__empty" id="search-empty">
              <span className="add-food__empty-icon">🔍</span>
              <p>No results found for "{searchQuery}"</p>
              <p className="add-food__empty-hint">Try a different search term</p>
            </div>
          )}

          {!loading && !error && results.length === 0 && !searchQuery.trim() && (
            <div className="add-food__empty" id="search-prompt">
              <span className="add-food__empty-icon">🍎</span>
              <p>Search for any food</p>
              <p className="add-food__empty-hint">Try "chicken breast" or "200g rice"</p>
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

      {/* Food Detail Modal */}
      {selectedFood && (
        <FoodDetail
          food={selectedFood}
          onClose={() => setSelectedFood(null)}
          onAdd={handleAddToMeal}
          initialMeal={initialMeal}
        />
      )}
    </div>
  );
}

export default AddFood;
