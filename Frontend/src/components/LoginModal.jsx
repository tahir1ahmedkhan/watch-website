import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function LoginModal({ isOpen, onClose, switchToRegister }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const { login } = useAuth();

  // Reset form when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setFormData({ email: '', password: '' });
      setError('');
      setIsLoading(false);
    }
  }, [isOpen]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    if (!formData.email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const result = await login(formData);
      
      if (result.success) {
        onClose();
        setFormData({ email: '', password: '' });
        setError('');
      } else {
        setError(result.error || 'Login failed. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please check your connection and try again.');
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOverlayClick = (e) => {
    // Only close if clicking directly on the overlay, not on child elements
    if (e.target === e.currentTarget && !isLoading) {
      onClose();
    }
  };

  const handleClose = () => {
    if (!isLoading) {
      onClose();
    }
  };

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = '0px';
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen && !isLoading) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, isLoading, onClose]);

  if (!isOpen) return null;

  return (
    <div className="auth-modal-overlay" onClick={handleOverlayClick}>
      <div className="auth-modal-container">
        <div className="auth-modal-content">
          <button 
            className="auth-close-btn" 
            onClick={handleClose}
            disabled={isLoading}
            aria-label="Close modal"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          
          <div className="auth-header">
            <h1 className="auth-title">Welcome Back</h1>
            <p className="auth-subtitle">Sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form" noValidate>
            {error && (
              <div className="auth-error-message" role="alert">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                  <line x1="15" y1="9" x2="9" y2="15" stroke="currentColor" strokeWidth="2"/>
                  <line x1="9" y1="9" x2="15" y2="15" stroke="currentColor" strokeWidth="2"/>
                </svg>
                {error}
              </div>
            )}
            
            <div className="auth-form-group">
              <label htmlFor="login-email" className="auth-label">Email Address</label>
              <input
                type="email"
                id="login-email"
                name="email"
                className="auth-input"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                disabled={isLoading}
                autoComplete="email"
                aria-describedby={error ? "login-error" : undefined}
              />
            </div>

            <div className="auth-form-group">
              <label htmlFor="login-password" className="auth-label">Password</label>
              <input
                type="password"
                id="login-password"
                name="password"
                className="auth-input"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
                disabled={isLoading}
                autoComplete="current-password"
                aria-describedby={error ? "login-error" : undefined}
              />
            </div>

            <button 
              type="submit" 
              className="auth-submit-btn"
              disabled={isLoading}
              aria-describedby={error ? "login-error" : undefined}
            >
              {isLoading ? (
                <>
                  <div className="auth-spinner" aria-hidden="true"></div>
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <div className="auth-divider">
            <span>or</span>
          </div>

          <div className="auth-switch">
            <p>Don't have an account?</p>
            <button 
              type="button" 
              className="auth-link-btn" 
              onClick={switchToRegister}
              disabled={isLoading}
            >
              Create Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}