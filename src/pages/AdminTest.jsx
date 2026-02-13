import React from 'react';
import { Link } from 'react-router-dom';

export default function AdminTest() {
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
        Admin Dashboard Test
      </h1>
      
      <p style={{ 
        color: 'rgba(255,255,255,0.9)', 
        marginBottom: '40px',
        maxWidth: '600px',
        lineHeight: '1.6',
        fontSize: '1.1rem'
      }}>
        Test the admin dashboard with MongoDB integration. Login with the default admin credentials.
      </p>
      
      <div style={{ 
        background: 'rgba(255,255,255,0.1)',
        padding: '20px',
        borderRadius: '12px',
        marginBottom: '40px',
        color: 'white'
      }}>
        <h3>Default Admin Credentials:</h3>
        <p><strong>Email:</strong> admin@watchstore.com</p>
        <p><strong>Password:</strong> admin123456</p>
        <p><strong>Role:</strong> Super Admin</p>
      </div>
      
      <div style={{ 
        display: 'flex', 
        gap: '20px', 
        flexWrap: 'wrap',
        justifyContent: 'center'
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
            boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
            transition: 'transform 0.2s ease'
          }}
          onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
          onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
        >
          🔐 Admin Login
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
            border: '2px solid rgba(255,255,255,0.3)',
            transition: 'transform 0.2s ease'
          }}
          onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
          onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
        >
          📊 Dashboard (Direct)
        </Link>
        
        <Link 
          to="/"
          style={{
            padding: '16px 32px',
            background: 'rgba(255,255,255,0.1)',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '12px',
            fontSize: '16px',
            fontWeight: '600',
            border: '2px solid rgba(255,255,255,0.2)',
            transition: 'transform 0.2s ease'
          }}
          onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
          onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
        >
          🏠 Back to Store
        </Link>
      </div>

      <div style={{
        background: 'rgba(255,255,255,0.1)',
        padding: '20px',
        borderRadius: '12px',
        maxWidth: '800px',
        width: '100%',
        marginTop: '40px'
      }}>
        <h3 style={{ color: 'white', marginBottom: '15px' }}>Admin Dashboard Features:</h3>
        <div style={{ color: 'rgba(255,255,255,0.9)', textAlign: 'left', lineHeight: '1.6' }}>
          <p>✅ <strong>Dashboard Overview:</strong> Total users, products, orders, and revenue statistics</p>
          <p>✅ <strong>Users Management:</strong> View all registered customers with search and pagination</p>
          <p>✅ <strong>Orders Management:</strong> Track orders, update status, add tracking numbers</p>
          <p>✅ <strong>Real-time Data:</strong> Connected to MongoDB with live data updates</p>
          <p>✅ <strong>Responsive Design:</strong> Works on desktop, tablet, and mobile devices</p>
          <p>✅ <strong>Secure Authentication:</strong> JWT-based admin authentication system</p>
        </div>
      </div>
    </div>
  );
}