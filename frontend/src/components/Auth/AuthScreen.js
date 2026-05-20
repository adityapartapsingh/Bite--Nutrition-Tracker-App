import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import './Auth.css';

function AuthScreen() {
  const { login, register } = useAuth();
  const [mode, setMode] = useState('login');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (mode === 'login') {
        await login(email, password);
      } else {
        if (!username.trim()) {
          throw new Error('Username is required');
        }
        await register(username.trim(), email.trim(), password);
      }
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setMode(mode === 'login' ? 'register' : 'login');
    setError('');
  };

  return (
    <div className="auth-screen" id="auth-screen">
      <div className="auth-screen__container">
        {/* Logo / Branding */}
        <div className="auth-screen__brand">
          <div className="auth-screen__logo">
            <span className="auth-screen__logo-icon">🍎</span>
          </div>
          <h1 className="auth-screen__app-name">Bite</h1>
          <p className="auth-screen__tagline">Track your nutrition, hit your goals</p>
        </div>

        {/* Form Card */}
        <div className="auth-screen__card">
          <h2 className="auth-screen__title">
            {mode === 'login' ? 'Welcome back' : 'Create account'}
          </h2>

          <form className="auth-screen__form" onSubmit={handleSubmit}>
            {mode === 'register' && (
              <div className="auth-screen__field">
                <label className="auth-screen__label" htmlFor="auth-username">Username</label>
                <div className="auth-screen__input-wrapper">
                  <svg className="auth-screen__input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  <input
                    id="auth-username"
                    type="text"
                    className="auth-screen__input"
                    placeholder="Choose a username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    autoComplete="username"
                    required
                  />
                </div>
              </div>
            )}

            <div className="auth-screen__field">
              <label className="auth-screen__label" htmlFor="auth-email">Email</label>
              <div className="auth-screen__input-wrapper">
                <svg className="auth-screen__input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <polyline points="22,7 12,13 2,7" />
                </svg>
                <input
                  id="auth-email"
                  type="email"
                  className="auth-screen__input"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                />
              </div>
            </div>

            <div className="auth-screen__field">
              <label className="auth-screen__label" htmlFor="auth-password">Password</label>
              <div className="auth-screen__input-wrapper">
                <svg className="auth-screen__input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <input
                  id="auth-password"
                  type="password"
                  className="auth-screen__input"
                  placeholder={mode === 'register' ? 'Min 6 characters' : 'Your password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                  minLength={6}
                  required
                />
              </div>
            </div>

            {error && (
              <div className="auth-screen__error" id="auth-error">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <span>{error}</span>
              </div>
            )}

            <button
              className="auth-screen__submit"
              id="auth-submit-btn"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <span className="auth-screen__spinner" />
              ) : (
                mode === 'login' ? 'Sign In' : 'Create Account'
              )}
            </button>
          </form>

          <div className="auth-screen__switch">
            <span className="auth-screen__switch-text">
              {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}
            </span>
            <button
              className="auth-screen__switch-btn"
              id="auth-switch-btn"
              onClick={toggleMode}
              type="button"
            >
              {mode === 'login' ? 'Sign Up' : 'Sign In'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthScreen;
