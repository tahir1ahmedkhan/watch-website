import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/admin.css';

export default function AdminDashboardWorking() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [adminUser, setAdminUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const adminToken = localStorage.getItem('adminToken');
    const adminUserData = localStorage.getItem('adminUser');

    if (!adminToken) {
      navigate('/admin/login');
      return;
    }

    if (adminUserData) {
      try {
        setAdminUser(JSON.parse(adminUserData));
      } catch (e) {
        console.error('Error parsing admin user data:', e);
      }
    }

    setIsLoading(false);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    navigate('/admin/login');
  };

  if (isLoading) {
    return (
      <div className="admin-loading">
        <div className="admin-spinner"></div>
        <p>Loading admin dashboard...</p>
      </div>
    );
  }

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <div className="admin-sidebar">
        <div className="admin-sidebar-header">
          <div className="admin-sidebar-logo">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
              <path d="M12 1V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M12 21V23" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M4.22 4.22L5.64 5.64" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M18.36 18.36L19.78 19.78" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M1 12H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M21 12H23" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M4.22 19.78L5.64 18.36" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M18.36 5.64L19.78 4.22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <h2>Watch Store</h2>
          <p>Admin Panel</p>
        </div>

        <nav className="admin-sidebar-nav">
          <button
            className={`admin-nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="3" width="7" height="7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <rect x="14" y="3" width="7" height="7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <rect x="14" y="14" width="7" height="7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <rect x="3" y="14" width="7" height="7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Dashboard</span>
          </button>
          
          <button
            className={`admin-nav-item ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M23 21V19C23 18.1645 22.7155 17.3541 22.2094 16.7007C21.7033 16.0473 20.9999 15.5902 20.2 15.4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M16 3.13C16.8003 3.35031 17.5037 3.80771 18.0098 4.46117C18.5159 5.11462 18.8004 5.92502 18.8004 6.76C18.8004 7.59498 18.5159 8.40538 18.0098 9.05883C17.5037 9.71229 16.8003 10.1697 16 10.39" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Users</span>
          </button>
          
          <button
            className={`admin-nav-item ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 4H18C18.5304 4 19.0391 4.21071 19.4142 4.58579C19.7893 4.96086 20 5.46957 20 6V20C20 20.5304 19.7893 21.0391 19.4142 21.4142C19.0391 21.7893 18.5304 22 18 22H6C5.46957 22 4.96086 21.7893 4.58579 21.4142C4.21071 21.0391 4 20.5304 4 20V6C4 5.46957 4.21071 4.96086 4.58579 4.58579C4.96086 4.21071 5.46957 4 6 4H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <rect x="8" y="2" width="8" height="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <line x1="10" y1="14" x2="14" y2="14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <line x1="10" y1="18" x2="14" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Orders</span>
          </button>
        </nav>

        <div className="admin-sidebar-footer">
          <div className="admin-sidebar-user">
            <div className="admin-sidebar-avatar">
              {adminUser?.firstName?.[0] || 'A'}{adminUser?.lastName?.[0] || 'D'}
            </div>
            <div className="admin-sidebar-user-info">
              <span className="admin-sidebar-user-name">
                {adminUser?.firstName || 'Admin'} {adminUser?.lastName || 'User'}
              </span>
              <span className="admin-sidebar-user-role">{adminUser?.role || 'admin'}</span>
            </div>
          </div>
          
          <button className="admin-logout-btn" onClick={handleLogout}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <polyline points="16,17 21,12 16,7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <line x1="21" y1="12" x2="9" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Logout
          </button>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="admin-main">
        <div className="admin-header">
          <div className="admin-header-left">
            <h1>
              {activeTab === 'dashboard' && 'Dashboard'}
              {activeTab === 'users' && 'Users Management'}
              {activeTab === 'orders' && 'Orders Management'}
            </h1>
            <p>
              {activeTab === 'dashboard' && 'Overview of your watch store'}
              {activeTab === 'users' && 'Manage customer accounts'}
              {activeTab === 'orders' && 'Track and manage orders'}
            </p>
          </div>
          
          <div className="admin-header-right">
            <div className="admin-user-info">
              <div className="admin-avatar">
                {adminUser?.firstName?.[0] || 'A'}{adminUser?.lastName?.[0] || 'D'}
              </div>
              <div className="admin-user-details">
                <span className="admin-user-name">
                  {adminUser?.firstName || 'Admin'} {adminUser?.lastName || 'User'}
                </span>
                <span className="admin-user-role">{adminUser?.role || 'admin'}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="admin-content">
          {activeTab === 'dashboard' && (
            <div style={{ 
              background: 'white', 
              padding: '40px', 
              borderRadius: '12px',
              textAlign: 'center'
            }}>
              <h2>Dashboard Content</h2>
              <p>Welcome to the admin dashboard!</p>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '20px',
                marginTop: '20px'
              }}>
                <div style={{ 
                  background: '#f8f9fa', 
                  padding: '20px', 
                  borderRadius: '8px',
                  border: '1px solid #e9ecef'
                }}>
                  <h3>Total Users</h3>
                  <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#667eea' }}>Loading...</p>
                </div>
                <div style={{ 
                  background: '#f8f9fa', 
                  padding: '20px', 
                  borderRadius: '8px',
                  border: '1px solid #e9ecef'
                }}>
                  <h3>Total Orders</h3>
                  <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#667eea' }}>Loading...</p>
                </div>
                <div style={{ 
                  background: '#f8f9fa', 
                  padding: '20px', 
                  borderRadius: '8px',
                  border: '1px solid #e9ecef'
                }}>
                  <h3>Total Revenue</h3>
                  <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#667eea' }}>Loading...</p>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'users' && (
            <div style={{ 
              background: 'white', 
              padding: '40px', 
              borderRadius: '12px',
              textAlign: 'center'
            }}>
              <h2>Users Management</h2>
              <p>Manage your customers here</p>
            </div>
          )}
          
          {activeTab === 'orders' && (
            <div style={{ 
              background: 'white', 
              padding: '40px', 
              borderRadius: '12px',
              textAlign: 'center'
            }}>
              <h2>Orders Management</h2>
              <p>Track and manage orders here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}