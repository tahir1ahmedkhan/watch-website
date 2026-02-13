import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function AdminDebug() {
  const [backendStatus, setBackendStatus] = useState('checking...');
  const [adminLoginTest, setAdminLoginTest] = useState('not tested');
  const [dashboardTest, setDashboardTest] = useState('not tested');

  useEffect(() => {
    testBackend();
  }, []);

  const testBackend = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/health');
      const data = await response.json();
      if (data.success) {
        setBackendStatus('✅ Backend is running');
      } else {
        setBackendStatus('❌ Backend error');
      }
    } catch (error) {
      setBackendStatus('❌ Backend not accessible');
    }
  };

  const testAdminLogin = async () => {
    setAdminLoginTest('testing...');
    try {
      const response = await fetch('http://localhost:5000/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: 'admin@watchstore.com',
          password: 'admin123456'
        })
      });

      const data = await response.json();
      if (data.success) {
        localStorage.setItem('adminToken', data.data.token);
        localStorage.setItem('adminUser', JSON.stringify(data.data.admin));
        setAdminLoginTest('✅ Login successful');
      } else {
        setAdminLoginTest('❌ Login failed: ' + data.message);
      }
    } catch (error) {
      setAdminLoginTest('❌ Login error: ' + error.message);
    }
  };

  const testDashboard = async () => {
    setDashboardTest('testing...');
    const token = localStorage.getItem('adminToken');
    
    if (!token) {
      setDashboardTest('❌ No admin token found');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/admin/dashboard/stats', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
      if (data.success) {
        setDashboardTest('✅ Dashboard API working');
      } else {
        setDashboardTest('❌ Dashboard API failed: ' + data.message);
      }
    } catch (error) {
      setDashboardTest('❌ Dashboard API error: ' + error.message);
    }
  };

  const clearStorage = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    setAdminLoginTest('not tested');
    setDashboardTest('not tested');
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
        Admin Dashboard Debug
      </h1>
      
      <div style={{ 
        background: 'rgba(255,255,255,0.1)',
        padding: '30px',
        borderRadius: '12px',
        marginBottom: '30px',
        color: 'white',
        maxWidth: '800px',
        width: '100%'
      }}>
        <h3>System Status:</h3>
        <div style={{ textAlign: 'left', lineHeight: '2' }}>
          <p><strong>Backend Health:</strong> {backendStatus}</p>
          <p><strong>Admin Login:</strong> {adminLoginTest}</p>
          <p><strong>Dashboard API:</strong> {dashboardTest}</p>
          <p><strong>Current URL:</strong> {window.location.href}</p>
          <p><strong>Admin Token:</strong> {localStorage.getItem('adminToken') ? '✅ Present' : '❌ Missing'}</p>
          <p><strong>Admin User:</strong> {localStorage.getItem('adminUser') ? '✅ Present' : '❌ Missing'}</p>
        </div>
      </div>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '20px', 
        marginBottom: '30px',
        width: '100%',
        maxWidth: '800px'
      }}>
        <button 
          onClick={testBackend}
          style={{
            padding: '16px 24px',
            background: 'rgba(255,255,255,0.2)',
            color: 'white',
            border: '2px solid rgba(255,255,255,0.3)',
            borderRadius: '12px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          🔍 Test Backend
        </button>
        
        <button 
          onClick={testAdminLogin}
          style={{
            padding: '16px 24px',
            background: 'rgba(255,255,255,0.2)',
            color: 'white',
            border: '2px solid rgba(255,255,255,0.3)',
            borderRadius: '12px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          🔐 Test Admin Login
        </button>
        
        <button 
          onClick={testDashboard}
          style={{
            padding: '16px 24px',
            background: 'rgba(255,255,255,0.2)',
            color: 'white',
            border: '2px solid rgba(255,255,255,0.3)',
            borderRadius: '12px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          📊 Test Dashboard API
        </button>
        
        <button 
          onClick={clearStorage}
          style={{
            padding: '16px 24px',
            background: 'rgba(255,0,0,0.3)',
            color: 'white',
            border: '2px solid rgba(255,0,0,0.5)',
            borderRadius: '12px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          🧹 Clear Storage
        </button>
      </div>
      
      <div style={{ 
        display: 'flex', 
        gap: '20px', 
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginBottom: '30px'
      }}>
        <Link 
          to="/admin/login"
          style={{
            padding: '16px 32px',
            background: 'white',
            color: '#667eea',
            textDecoration: 'none',
            borderRadius: '12px',
            fontSize: '16px',
            fontWeight: '600',
            boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
          }}
        >
          🔐 Go to Login
        </Link>
        
        <Link 
          to="/admin/dashboard"
          style={{
            padding: '16px 32px',
            background: 'rgba(255,255,255,0.2)',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '12px',
            fontSize: '16px',
            fontWeight: '600',
            border: '2px solid rgba(255,255,255,0.3)'
          }}
        >
          📊 Go to Dashboard
        </Link>
        
        <Link 
          to="/admin/test"
          style={{
            padding: '16px 32px',
            background: 'rgba(255,255,255,0.1)',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '12px',
            fontSize: '16px',
            fontWeight: '600',
            border: '2px solid rgba(255,255,255,0.2)'
          }}
        >
          🧪 Test Page
        </Link>
      </div>

      <div style={{
        background: 'rgba(255,255,255,0.1)',
        padding: '20px',
        borderRadius: '12px',
        maxWidth: '800px',
        width: '100%'
      }}>
        <h3 style={{ color: 'white', marginBottom: '15px' }}>Troubleshooting Steps:</h3>
        <div style={{ color: 'rgba(255,255,255,0.9)', textAlign: 'left', lineHeight: '1.6' }}>
          <p>1. <strong>Test Backend:</strong> Verify the backend API is running</p>
          <p>2. <strong>Test Admin Login:</strong> Authenticate and get admin token</p>
          <p>3. <strong>Test Dashboard API:</strong> Verify dashboard data can be fetched</p>
          <p>4. <strong>Go to Login:</strong> Use the admin login page</p>
          <p>5. <strong>Go to Dashboard:</strong> Access the admin dashboard</p>
        </div>
      </div>
    </div>
  );
}