import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { validationDebug } from '../utils/validationDebug';

export default function RegisterModal({ isOpen, onClose, switchToLogin }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const { register } = useAuth();

  // Reset form when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: ''
      });
      setError('');
      setIsLoading(false);
    }
  }, [isOpen]);

  const handleChange = (e) => {
    let value = e.target.value;
    
    // Clean phone number as user types
    if (e.target.name === 'phone') {
      value = validationDebug.cleanPhoneNumber(value);
    }
    
    setFormData({
      ...formData,
      [e.target.name]: value
    });
    
    // Clear error when user starts typing
    if (error) setError('');
  };

  const validateForm = () => {
    const validation = validationDebug.validateRegistrationData(formData);
    
    if (!validation.isValid) {
      setError(validation.errors[0]); // Show first error
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const { confirmPassword, ...registerData } = formData;
      
      // Clean phone number before sending
      if (registerData.phone) {
        registerData.phone = validationDebug.cleanPhoneNumber(registerData.phone);
      }
      
      const result = await register(registerData);
      
      if (result.success) {
        onClose();
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          confirmPassword: '',
          phone: ''
        });
        setError('');
      } else {
        // Handle specific validation errors
        if (result.error && result.error.includes('Validation failed:')) {
          setError(result.error.replace('Validation failed: ', ''));
        } else {
          setError(result.error || 'Registration failed. Please try again.');
        }
      }
    } catch (err) {
      console.error('Registration error:', err);
      if (err.message && err.message.includes('Validation failed:')) {
        setError(err.message.replace('Validation failed: ', ''));
      } else {
        setError('Network error. Please check your connection and try again.');
      }
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
        <div className="auth-modal-content auth-modal-register">
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
            <h1 className="auth-title">Create Account</h1>
            <p className="auth-subtitle">Join us and start shopping</p>
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
            
            <div className="auth-form-row">
              <div className="auth-form-group">
                <label htmlFor="register-firstName" className="auth-label">First Name</label>
                <input
                  type="text"
                  id="register-firstName"
                  name="firstName"
                  className="auth-input"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="First name"
                  required
                  disabled={isLoading}
                  autoComplete="given-name"
                />
              </div>

              <div className="auth-form-group">
                <label htmlFor="register-lastName" className="auth-label">Last Name</label>
                <input
                  type="text"
                  id="register-lastName"
                  name="lastName"
                  className="auth-input"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Last name"
                  required
                  disabled={isLoading}
                  autoComplete="family-name"
                />
              </div>
            </div>

            <div className="auth-form-group">
              <label htmlFor="register-email" className="auth-label">Email Address</label>
              <input
                type="email"
                id="register-email"
                name="email"
                className="auth-input"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                disabled={isLoading}
                autoComplete="email"
              />
            </div>

            <div className="auth-form-group">
              <label htmlFor="register-phone" className="auth-label">Phone Number (Optional)</label>
              <input
                type="tel"
                id="register-phone"
                name="phone"
                className="auth-input"
                value={formData.phone}
                onChange={handleChange}
                placeholder="e.g., +1234567890 or 1234567890"
                disabled={isLoading}
                autoComplete="tel"
                pattern="[\+]?[1-9][\d]{9,14}"
                title="Enter a valid phone number (10-15 digits, optionally starting with +)"
              />
            </div>

            <div className="auth-form-row">
              <div className="auth-form-group">
                <label htmlFor="register-password" className="auth-label">Password</label>
                <input
                  type="password"
                  id="register-password"
                  name="password"
                  className="auth-input"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create password"
                  required
                  disabled={isLoading}
                  minLength="6"
                  autoComplete="new-password"
                />
              </div>

              <div className="auth-form-group">
                <label htmlFor="register-confirmPassword" className="auth-label">Confirm Password</label>
                <input
                  type="password"
                  id="register-confirmPassword"
                  name="confirmPassword"
                  className="auth-input"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm password"
                  required
                  disabled={isLoading}
                  minLength="6"
                  autoComplete="new-password"
                />
              </div>
            </div>

            <button 
              type="submit" 
              className="auth-submit-btn"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="auth-spinner" aria-hidden="true"></div>
                  Creating Account...
                </>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          <div className="auth-divider">
            <span>or</span>
          </div>

          <div className="auth-switch">
            <p>Already have an account?</p>
            <button 
              type="button" 
              className="auth-link-btn" 
              onClick={switchToLogin}
              disabled={isLoading}
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}