import React from 'react';

export default function AdminDashboardSimple() {
  return (
    <div style={{ 
      padding: '40px', 
      textAlign: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white'
    }}>
      <h1>Admin Dashboard - Simple Test</h1>
      <p>If you can see this, the routing is working!</p>
      <div style={{ 
        background: 'rgba(255,255,255,0.1)',
        padding: '20px',
        borderRadius: '12px',
        marginTop: '20px'
      }}>
        <h3>Debug Info:</h3>
        <p>Current URL: {window.location.href}</p>
        <p>Admin Token: {localStorage.getItem('adminToken') ? 'Present' : 'Missing'}</p>
        <p>Admin User: {localStorage.getItem('adminUser') ? 'Present' : 'Missing'}</p>
      </div>
      
      <div style={{ marginTop: '20px' }}>
        <button 
          onClick={() => window.location.href = '/admin/login'}
          style={{
            padding: '10px 20px',
            background: 'white',
            color: '#667eea',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            marginRight: '10px'
          }}
        >
          Go to Login
        </button>
        
        <button 
          onClick={() => window.location.href = '/admin/test'}
          style={{
            padding: '10px 20px',
            background: 'rgba(255,255,255,0.2)',
            color: 'white',
            border: '2px solid white',
            borderRadius: '8px',
            cursor: 'pointer'
          }}
        >
          Go to Test Page
        </button>
      </div>
    </div>
  );
}