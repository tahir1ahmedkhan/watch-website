import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import apiService from '../services/api';
import { FaBox, FaClock, FaTruck, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      fetchOrders();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, selectedStatus]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const params = selectedStatus !== 'all' ? { status: selectedStatus } : {};
      const response = await apiService.getMyOrders(params);
      
      if (response.success) {
        setOrders(response.data.orders);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      console.error('Fetch orders error:', error);
      setError(error.message || 'Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <FaClock className="status-icon pending" />;
      case 'processing':
        return <FaBox className="status-icon processing" />;
      case 'shipped':
        return <FaTruck className="status-icon shipped" />;
      case 'delivered':
        return <FaCheckCircle className="status-icon delivered" />;
      case 'cancelled':
        return <FaTimesCircle className="status-icon cancelled" />;
      default:
        return <FaClock className="status-icon" />;
    }
  };

  const getStatusText = (status) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const cancelOrder = async (orderId) => {
    if (!window.confirm('Are you sure you want to cancel this order?')) {
      return;
    }

    try {
      const response = await apiService.cancelOrder(orderId);
      
      if (response.success) {
        // Refresh orders
        fetchOrders();
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      console.error('Cancel order error:', error);
      alert(error.message || 'Failed to cancel order');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="container">
        <div className="auth-required">
          <h2>Please log in to view your orders</h2>
          <p>You need to be logged in to access your order history.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container">
        <div className="loading-state">
          <h2>Loading your orders...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="orders-page">
        <div className="orders-header">
          <h1>My Orders</h1>
          <p>Welcome back, {user?.firstName}! Here are your recent orders.</p>
        </div>

        {/* Status Filter */}
        <div className="status-filter">
          <button 
            className={`filter-btn ${selectedStatus === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedStatus('all')}
          >
            All Orders
          </button>
          <button 
            className={`filter-btn ${selectedStatus === 'pending' ? 'active' : ''}`}
            onClick={() => setSelectedStatus('pending')}
          >
            Pending
          </button>
          <button 
            className={`filter-btn ${selectedStatus === 'processing' ? 'active' : ''}`}
            onClick={() => setSelectedStatus('processing')}
          >
            Processing
          </button>
          <button 
            className={`filter-btn ${selectedStatus === 'shipped' ? 'active' : ''}`}
            onClick={() => setSelectedStatus('shipped')}
          >
            Shipped
          </button>
          <button 
            className={`filter-btn ${selectedStatus === 'delivered' ? 'active' : ''}`}
            onClick={() => setSelectedStatus('delivered')}
          >
            Delivered
          </button>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {orders.length === 0 ? (
          <div className="no-orders">
            <FaBox className="no-orders-icon" />
            <h3>No orders found</h3>
            <p>
              {selectedStatus === 'all' 
                ? "You haven't placed any orders yet." 
                : `No ${selectedStatus} orders found.`
              }
            </p>
            <button 
              className="shop-now-btn"
              onClick={() => window.location.href = '/products'}
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map((order) => (
              <div key={order._id} className="order-card">
                <div className="order-header">
                  <div className="order-info">
                    <h3>Order #{order.orderNumber}</h3>
                    <p className="order-date">{formatDate(order.createdAt)}</p>
                  </div>
                  <div className="order-status">
                    {getStatusIcon(order.status)}
                    <span className={`status-text ${order.status}`}>
                      {getStatusText(order.status)}
                    </span>
                  </div>
                </div>

                <div className="order-items">
                  {order.items.map((item, index) => (
                    <div key={index} className="order-item">
                      <img src={item.image} alt={item.name} />
                      <div className="item-details">
                        <h4>{item.name}</h4>
                        <p>Quantity: {item.quantity}</p>
                        <p className="item-price">${item.price.toFixed(2)} each</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="order-summary">
                  <div className="summary-row">
                    <span>Subtotal:</span>
                    <span>${order.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="summary-row">
                    <span>Tax:</span>
                    <span>${order.tax.toFixed(2)}</span>
                  </div>
                  <div className="summary-row">
                    <span>Shipping:</span>
                    <span>${order.shipping.toFixed(2)}</span>
                  </div>
                  <div className="summary-row total">
                    <span>Total:</span>
                    <span>${order.total.toFixed(2)}</span>
                  </div>
                </div>

                {order.trackingNumber && (
                  <div className="tracking-info">
                    <strong>Tracking Number:</strong> {order.trackingNumber}
                  </div>
                )}

                <div className="order-actions">
                  {order.status === 'pending' && (
                    <button 
                      className="cancel-btn"
                      onClick={() => cancelOrder(order._id)}
                    >
                      Cancel Order
                    </button>
                  )}
                  <button className="view-details-btn">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}