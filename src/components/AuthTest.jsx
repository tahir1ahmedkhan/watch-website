import React, { useState } from 'react';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';
import { debugAuth } from '../utils/authDebug';
import { validationDebug } from '../utils/validationDebug';

export default function AuthTest() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [debugResults, setDebugResults] = useState('');

  const switchToRegister = () => {
    setShowLogin(false);
    setShowRegister(true);
  };

  const switchToLogin = () => {
    setShowRegister(false);
    setShowLogin(true);
  };

  const closeModals = () => {
    setShowLogin(false);
    setShowRegister(false);
  };

  const runDebugTests = async () => {
    setDebugResults('Running tests...');
    
    // Capture console output
    const originalLog = console.log;
    const originalError = console.error;
    let output = '';
    
    console.log = (...args) => {
      output += args.join(' ') + '\n';
      originalLog(...args);
    };
    
    console.error = (...args) => {
      output += 'ERROR: ' + args.join(' ') + '\n';
      originalError(...args);
    };

    try {
      await debugAuth.runAllTests();
    } catch (error) {
      output += `FATAL ERROR: ${error.message}\n`;
    }

    // Restore console
    console.log = originalLog;
    console.error = originalError;
    
    setDebugResults(output);
  };

  const runValidationTests = async () => {
    setDebugResults('Running validation tests...');
    
    // Capture console output
    const originalLog = console.log;
    const originalError = console.error;
    let output = '';
    
    console.log = (...args) => {
      output += args.join(' ') + '\n';
      originalLog(...args);
    };
    
    console.error = (...args) => {
      output += 'ERROR: ' + args.join(' ') + '\n';
      originalError(...args);
    };

    try {
      await validationDebug.testRegistrationValidation();
    } catch (error) {
      output += `FATAL ERROR: ${error.message}\n`;
    }

    // Restore console
    console.log = originalLog;
    console.error = originalError;
    
    setDebugResults(output);
  };

  const clearDebugResults = () => {
    setDebugResults('');
  };

  const clearAuth = () => {
    debugAuth.clearAuth();
    setDebugResults('Authentication data cleared from localStorage');
  };

  return (
    <div style={{ 
      padding: '40px', 
      textAlign: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <h1 style={{ color: 'white', marginBottom: '20px', fontSize: '2.5rem' }}>
        Authentication Test & Debug
      </h1>
      
      <p style={{ 
        color: 'rgba(255,255,255,0.9)', 
        marginBottom: '40px',
        maxWidth: '800px',
        lineHeight: '1.6',
        fontSize: '1.1rem'
      }}>
        Test the perfectly centered login and register modals, and debug any authentication issues.
      </p>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '20px', 
        marginBottom: '40px',
        width: '100%',
        maxWidth: '1000px'
      }}>
        <button 
          onClick={() => setShowLogin(true)}
          style={{
            padding: '16px 24px',
            background: 'white',
            border: 'none',
            borderRadius: '12px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
            transition: 'transform 0.2s ease'
          }}
          onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
          onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
        >
          🔐 Test Login Modal
        </button>
        
        <button 
          onClick={() => setShowRegister(true)}
          style={{
            padding: '16px 24px',
            background: 'white',
            border: 'none',
            borderRadius: '12px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
            transition: 'transform 0.2s ease'
          }}
          onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
          onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
        >
          📝 Test Register Modal
        </button>

        <button 
          onClick={runDebugTests}
          style={{
            padding: '16px 24px',
            background: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
            transition: 'transform 0.2s ease'
          }}
          onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
          onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
        >
          🧪 Run Debug Tests
        </button>

        <button 
          onClick={runValidationTests}
          style={{
            padding: '16px 24px',
            background: '#17a2b8',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
            transition: 'transform 0.2s ease'
          }}
          onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
          onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
        >
          ✅ Test Validation
        </button>

        <button 
          onClick={clearAuth}
          style={{
            padding: '16px 24px',
            background: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
            transition: 'transform 0.2s ease'
          }}
          onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
          onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
        >
          🧹 Clear Auth Data
        </button>
      </div>

      {debugResults && (
        <div style={{
          background: 'rgba(0,0,0,0.8)',
          color: '#00ff00',
          padding: '20px',
          borderRadius: '12px',
          fontFamily: 'monospace',
          fontSize: '14px',
          textAlign: 'left',
          maxWidth: '1000px',
          width: '100%',
          maxHeight: '400px',
          overflowY: 'auto',
          whiteSpace: 'pre-wrap',
          marginBottom: '20px'
        }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '10px',
            borderBottom: '1px solid #333',
            paddingBottom: '10px'
          }}>
            <span style={{ color: '#fff', fontWeight: 'bold' }}>Debug Results:</span>
            <button 
              onClick={clearDebugResults}
              style={{
                background: '#666',
                color: 'white',
                border: 'none',
                padding: '4px 8px',
                borderRadius: '4px',
                fontSize: '12px',
                cursor: 'pointer'
              }}
            >
              Clear
            </button>
          </div>
          {debugResults}
        </div>
      )}

      <div style={{
        background: 'rgba(255,255,255,0.1)',
        padding: '20px',
        borderRadius: '12px',
        maxWidth: '1000px',
        width: '100%',
        marginTop: '20px'
      }}>
        <h3 style={{ color: 'white', marginBottom: '15px' }}>Common "Validation Failed" Issues & Solutions:</h3>
        <div style={{ color: 'rgba(255,255,255,0.9)', textAlign: 'left', lineHeight: '1.6' }}>
          <p><strong>1. Phone Number Issues:</strong> Phone must be 10-15 digits, optionally starting with +. Letters and special characters (except +) are not allowed.</p>
          <p><strong>2. Email Format:</strong> Must be a valid email format (user@domain.com)</p>
          <p><strong>3. Password Length:</strong> Must be at least 6 characters long</p>
          <p><strong>4. Required Fields:</strong> First name and last name cannot be empty</p>
          <p><strong>5. Password Confirmation:</strong> Both password fields must match exactly</p>
          <p><strong>6. Backend Connection:</strong> Make sure backend is running on port 5000</p>
        </div>
      </div>

      <LoginModal 
        isOpen={showLogin}
        onClose={closeModals}
        switchToRegister={switchToRegister}
      />
      
      <RegisterModal 
        isOpen={showRegister}
        onClose={closeModals}
        switchToLogin={switchToLogin}
      />
    </div>
  );
}