import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar';
import DashboardStats from '../components/DashboardStats';
import UsersTable from '../components/UsersTable';
import OrdersTable from '../components/OrdersTable';
import '../styles/admin.css';

export default function AdminDashboard() {
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
      setAdminUser(JSON.parse(adminUserData));
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

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardStats />;
      case 'users':
        return <UsersTable />;
      case 'orders':
        return <OrdersTable />;
      default:
        return <DashboardStats />;
    }
  };

  return (
    <div className="admin-layout">
      <AdminSidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        adminUser={adminUser}
        onLogout={handleLogout}
      />
      
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
                {adminUser?.firstName?.[0]}{adminUser?.lastName?.[0]}
              </div>
              <div className="admin-user-details">
                <span className="admin-user-name">
                  {adminUser?.firstName} {adminUser?.lastName}
                </span>
                <span className="admin-user-role">{adminUser?.role}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="admin-content">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}