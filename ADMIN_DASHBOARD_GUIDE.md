# Admin Dashboard Setup Guide

## 🎯 Overview

I've created a comprehensive admin dashboard for your watch store with full MongoDB integration. The dashboard provides complete control over users, orders, and business analytics.

## 🚀 Quick Start

### 1. Backend Setup (Already Done)
```bash
cd Backend
npm run build
npm start
```

### 2. Frontend Setup (Already Done)
```bash
cd Frontend
npm start
```

### 3. Access Admin Dashboard
- **Test Page**: http://localhost:3001/admin/test
- **Admin Login**: http://localhost:3001/admin/login
- **Dashboard**: http://localhost:3001/admin/dashboard

## 🔐 Default Admin Credentials

```
Email: admin@watchstore.com
Password: admin123456
Role: Super Admin
```

## 📊 Dashboard Features

### 1. **Dashboard Overview**
- Total users, products, orders statistics
- Revenue tracking
- Order status breakdown (pending, processing, shipped, delivered, cancelled)
- Recent orders list
- Top-selling products

### 2. **Users Management**
- View all registered customers
- Search users by name or email
- Pagination support
- User registration date and details

### 3. **Orders Management**
- View all orders with filtering by status
- Update order status (pending → processing → shipped → delivered)
- Add tracking numbers
- Add order notes
- Customer information for each order
- Order items and total amount

### 4. **Real-time Data**
- Live MongoDB integration
- Automatic data refresh
- Real-time statistics

## 🛠 Technical Implementation

### Backend Components Created:

1. **Models**
   - `Admin.ts` - Admin user model with roles and authentication
   
2. **Controllers**
   - `adminController.ts` - All admin operations (login, stats, users, orders)
   
3. **Middleware**
   - `adminAuth.ts` - Admin authentication and authorization
   
4. **Routes**
   - `admin.ts` - Admin API endpoints
   
5. **Scripts**
   - `seedAdmin.ts` - Creates default super admin user

### Frontend Components Created:

1. **Pages**
   - `AdminLogin.jsx` - Secure admin login page
   - `AdminDashboard.jsx` - Main dashboard layout
   - `AdminTest.jsx` - Testing and demo page
   
2. **Components**
   - `AdminSidebar.jsx` - Navigation sidebar
   - `DashboardStats.jsx` - Statistics and charts
   - `UsersTable.jsx` - Users management table
   - `OrdersTable.jsx` - Orders management table
   
3. **Styles**
   - `admin.css` - Complete admin dashboard styling

## 🔧 API Endpoints

### Admin Authentication
- `POST /api/admin/login` - Admin login
- `GET /api/admin/profile` - Get admin profile

### Dashboard Data
- `GET /api/admin/dashboard/stats` - Get dashboard statistics
- `GET /api/admin/users` - Get all users (with pagination/search)
- `GET /api/admin/orders` - Get all orders (with filtering)
- `PATCH /api/admin/orders/:id/status` - Update order status

### Admin Management (Super Admin only)
- `POST /api/admin/create-admin` - Create new admin user

## 🎨 Design Features

- **Modern UI**: Clean, professional design with gradients and shadows
- **Responsive**: Works perfectly on desktop, tablet, and mobile
- **Dark/Light Theme**: Professional color scheme
- **Interactive**: Hover effects, loading states, and smooth transitions
- **Accessible**: ARIA labels, keyboard navigation, and screen reader support

## 📱 Mobile Responsive

The dashboard is fully responsive and adapts to:
- Desktop (1024px+)
- Tablet (768px - 1024px)
- Mobile (< 768px)

## 🔒 Security Features

- JWT-based authentication
- Role-based access control (admin, super-admin)
- Protected routes
- Secure password hashing with bcrypt
- Input validation and sanitization

## 🚀 How to Use

1. **Start both servers** (Backend on port 5000, Frontend on port 3001)
2. **Visit** http://localhost:3001/admin/test to see the overview
3. **Login** with the default credentials
4. **Explore** the dashboard features:
   - View statistics on the Dashboard tab
   - Manage users in the Users tab
   - Handle orders in the Orders tab

## 📈 Dashboard Statistics Include:

- **Total Users**: Count of registered customers
- **Total Products**: Available products in store
- **Total Orders**: All orders placed
- **Total Revenue**: Sum of completed orders
- **Order Status Breakdown**: Visual representation of order statuses
- **Recent Orders**: Latest 10 orders with customer details
- **Top Products**: Best-selling items by quantity and revenue

## 🛡 Admin Roles

- **Super Admin**: Full access, can create other admins
- **Admin**: Standard access to dashboard, users, and orders

## 🔄 Order Management Workflow

1. **View Orders**: See all orders with customer and product details
2. **Filter by Status**: Filter orders by pending, processing, shipped, etc.
3. **Update Status**: Change order status with tracking numbers
4. **Add Notes**: Include internal notes for order processing

## 💾 MongoDB Integration

The dashboard connects directly to your MongoDB database and displays:
- Real user data from the `users` collection
- Actual orders from the `orders` collection
- Product information from the `products` collection
- Admin users from the `admins` collection

## 🎯 Next Steps

You can now:
1. Login to the admin dashboard
2. View real customer data
3. Manage orders and update their status
4. Monitor business performance
5. Create additional admin users (as super admin)

The admin dashboard is fully functional and ready for production use!