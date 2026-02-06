import React, { useState, useEffect } from 'react';

export default function DashboardStats() {
  const [stats, setStats] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('http://localhost:5000/api/admin/dashboard/stats', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
      if (data.success) {
        setStats(data.data.stats);
        setRecentOrders(data.data.recentOrders);
        setTopProducts(data.data.topProducts);
      } else {
        setError(data.message);
      }
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError('Failed to load dashboard data');
    } finally {
      setIsLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: '#f59e0b',
      processing: '#3b82f6',
      shipped: '#8b5cf6',
      delivered: '#10b981',
      cancelled: '#ef4444'
    };
    return colors[status] || '#6b7280';
  };

  if (isLoading) {
    return (
      <div className="admin-loading">
        <div className="admin-spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-error">
        <p>{error}</p>
        <button onClick={fetchDashboardData}>Retry</button>
      </div>
    );
  }

  return (
    <div className="dashboard-stats">
      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon users">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" strokeWidth="2"/>
              <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
              <path d="M23 21V19C23 18.1645 22.7155 17.3541 22.2094 16.7007C21.7033 16.0473 20.9999 15.5902 20.2 15.4" stroke="currentColor" strokeWidth="2"/>
              <path d="M16 3.13C16.8003 3.35031 17.5037 3.80771 18.0098 4.46117C18.5159 5.11462 18.8004 5.92502 18.8004 6.76C18.8004 7.59498 18.5159 8.40538 18.0098 9.05883C17.5037 9.71229 16.8003 10.1697 16 10.39" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </div>
          <div className="stat-content">
            <h3>Total Users</h3>
            <p className="stat-number">{stats?.totalUsers || 0}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon products">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
              <path d="M12 1V3" stroke="currentColor" strokeWidth="2"/>
              <path d="M12 21V23" stroke="currentColor" strokeWidth="2"/>
              <path d="M4.22 4.22L5.64 5.64" stroke="currentColor" strokeWidth="2"/>
              <path d="M18.36 18.36L19.78 19.78" stroke="currentColor" strokeWidth="2"/>
              <path d="M1 12H3" stroke="currentColor" strokeWidth="2"/>
              <path d="M21 12H23" stroke="currentColor" strokeWidth="2"/>
              <path d="M4.22 19.78L5.64 18.36" stroke="currentColor" strokeWidth="2"/>
              <path d="M18.36 5.64L19.78 4.22" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </div>
          <div className="stat-content">
            <h3>Total Products</h3>
            <p className="stat-number">{stats?.totalProducts || 0}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon orders">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 4H18C18.5304 4 19.0391 4.21071 19.4142 4.58579C19.7893 4.96086 20 5.46957 20 6V20C20 20.5304 19.7893 21.0391 19.4142 21.4142C19.0391 21.7893 18.5304 22 18 22H6C5.46957 22 4.96086 21.7893 4.58579 21.4142C4.21071 21.0391 4 20.5304 4 20V6C4 5.46957 4.21071 4.96086 4.58579 4.58579C4.96086 4.21071 5.46957 4 6 4H8" stroke="currentColor" strokeWidth="2"/>
              <rect x="8" y="2" width="8" height="4" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </div>
          <div className="stat-content">
            <h3>Total Orders</h3>
            <p className="stat-number">{stats?.totalOrders || 0}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon revenue">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line x1="12" y1="1" x2="12" y2="23" stroke="currentColor" strokeWidth="2"/>
              <path d="M17 5H9.5C8.57174 5 7.6815 5.36875 7.02513 6.02513C6.36875 6.6815 6 7.57174 6 8.5C6 9.42826 6.36875 10.3185 7.02513 10.9749C7.6815 11.6312 8.57174 12 9.5 12H14.5C15.4283 12 16.3185 12.3687 16.9749 13.0251C17.6312 13.6815 18 14.5717 18 15.5C18 16.4283 17.6312 17.3185 16.9749 17.9749C16.3185 18.6312 15.4283 19 14.5 19H6" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </div>
          <div className="stat-content">
            <h3>Total Revenue</h3>
            <p className="stat-number">{formatCurrency(stats?.totalRevenue || 0)}</p>
          </div>
        </div>
      </div>

      {/* Order Status Overview */}
      <div className="dashboard-section">
        <h3>Order Status Overview</h3>
        <div className="order-status-grid">
          {Object.entries(stats?.ordersByStatus || {}).map(([status, count]) => (
            <div key={status} className="order-status-card">
              <div 
                className="status-indicator" 
                style={{ backgroundColor: getStatusColor(status) }}
              ></div>
              <div className="status-content">
                <h4>{status.charAt(0).toUpperCase() + status.slice(1)}</h4>
                <p>{count}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="dashboard-grid">
        {/* Recent Orders */}
        <div className="dashboard-section">
          <h3>Recent Orders</h3>
          <div className="recent-orders">
            {recentOrders.length > 0 ? (
              recentOrders.map((order) => (
                <div key={order._id} className="recent-order-item">
                  <div className="order-info">
                    <h4>#{order._id.slice(-8)}</h4>
                    <p>{order.user?.firstName} {order.user?.lastName}</p>
                    <span className="order-date">{formatDate(order.createdAt)}</span>
                  </div>
                  <div className="order-details">
                    <span className="order-amount">{formatCurrency(order.totalAmount)}</span>
                    <span 
                      className="order-status"
                      style={{ color: getStatusColor(order.status) }}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="no-data">No recent orders</p>
            )}
          </div>
        </div>

        {/* Top Products */}
        <div className="dashboard-section">
          <h3>Top Selling Products</h3>
          <div className="top-products">
            {topProducts.length > 0 ? (
              topProducts.map((item, index) => (
                <div key={item._id} className="top-product-item">
                  <div className="product-rank">#{index + 1}</div>
                  <div className="product-info">
                    <h4>{item.product?.name}</h4>
                    <p>{item.totalQuantity} sold</p>
                  </div>
                  <div className="product-revenue">
                    {formatCurrency(item.totalRevenue)}
                  </div>
                </div>
              ))
            ) : (
              <p className="no-data">No sales data available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}