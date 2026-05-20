import React from 'react';
import './BottomNav.css';

function BottomNav({ activeTab, onTabChange }) {
  const tabs = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: (
        <svg viewBox="0 0 24 24">
          <rect x="3" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="3" width="7" height="7" rx="1.5" />
          <rect x="3" y="14" width="7" height="7" rx="1.5" />
          <rect x="14" y="14" width="7" height="7" rx="1.5" />
        </svg>
      ),
    },
    {
      id: 'add',
      label: 'Add',
      icon: (
        <svg viewBox="0 0 24 24">
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      ),
    },
    {
      id: 'history',
      label: 'History',
      icon: (
        <svg viewBox="0 0 24 24">
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <line x1="3" y1="10" x2="21" y2="10" />
          <line x1="9" y1="4" x2="9" y2="1" />
          <line x1="15" y1="4" x2="15" y2="1" />
        </svg>
      ),
    },
  ];

  return (
    <nav className="bottom-nav" id="bottom-nav" aria-label="Main navigation">
      <div className="bottom-nav__container">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const isAdd = tab.id === 'add';

          return (
            <button
              key={tab.id}
              id={`nav-tab-${tab.id}`}
              className={`bottom-nav__tab ${isActive ? 'bottom-nav__tab--active' : ''} ${isAdd ? 'bottom-nav__tab--add' : ''}`}
              onClick={() => onTabChange(tab.id)}
              aria-label={tab.label}
              aria-current={isActive ? 'page' : undefined}
              type="button"
            >
              {isAdd ? (
                <span className="bottom-nav__icon-wrapper">
                  {tab.icon}
                </span>
              ) : (
                <span className="bottom-nav__icon">
                  {tab.icon}
                </span>
              )}
              <span className="bottom-nav__label">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

export default BottomNav;
