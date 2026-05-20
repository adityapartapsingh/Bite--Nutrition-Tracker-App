import React from 'react';

function SearchBar({ value, onChange, onClear, loading }) {
  return (
    <div className="search-bar" id="search-bar">
      <div className="search-bar__input-wrapper">
        <svg className="search-bar__icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>

        <input
          className="search-bar__input"
          id="food-search-input"
          type="text"
          placeholder="Search foods... e.g. chicken breast 200g"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          autoComplete="off"
          autoFocus
        />

        {loading && (
          <div className="search-bar__spinner" />
        )}

        {value && !loading && (
          <button
            className="search-bar__clear"
            id="search-clear-btn"
            onClick={onClear}
            aria-label="Clear search"
            type="button"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}

export default SearchBar;
