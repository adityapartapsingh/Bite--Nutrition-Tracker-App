import React, { useState } from 'react';
import './styles/variables.css';
import { AuthProvider, useAuth } from './context/AuthContext';
import { NutritionProvider } from './context/NutritionContext';
import AuthScreen from './components/Auth/AuthScreen';
import Dashboard from './components/Dashboard/Dashboard';
import AddFood from './components/AddFood/AddFood';
import History from './components/History/History';
import BottomNav from './components/Navigation/BottomNav';

function AppContent() {
  const { user, loading, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedMeal, setSelectedMeal] = useState(null);

  // Show loading spinner while checking auth
  if (loading) {
    return (
      <div className="app-loading" id="app-loading">
        <div className="app-loading__spinner" />
        <p className="app-loading__text">Loading...</p>
      </div>
    );
  }

  // Show auth screen if not logged in
  if (!user) {
    return <AuthScreen />;
  }

  const handleNavigateToAdd = () => setActiveTab('add');
  const handleSelectMeal = (mealType) => setSelectedMeal(mealType);
  const handleSelectDate = () => setActiveTab('dashboard');

  const renderView = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <Dashboard
            onNavigateToAdd={handleNavigateToAdd}
            onSelectMeal={handleSelectMeal}
          />
        );
      case 'add':
        return <AddFood initialMeal={selectedMeal} />;
      case 'history':
        return <History onSelectDate={handleSelectDate} />;
      default:
        return <Dashboard onNavigateToAdd={handleNavigateToAdd} />;
    }
  };

  return (
    <NutritionProvider>
      <div className="app" id="app-root">
        {/* User header bar */}
        <header className="app-header" id="app-header">
          <span className="app-header__greeting">
            Hi, <strong>{user.username}</strong>
          </span>
          <button
            className="app-header__logout"
            id="logout-btn"
            onClick={logout}
            type="button"
          >
            Sign Out
          </button>
        </header>

        <main className="app-content">
          {renderView()}
        </main>
        <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    </NutritionProvider>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
