# Watch Store - Frontend & Backend Integration Guide

This guide will help you set up and connect the React frontend with the TypeScript backend.

## 🏗️ Project Structure

```
Watch-Store/
├── Frontend/          # React.js application
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/         # Page components
│   │   ├── contexts/      # React contexts (Auth)
│   │   ├── services/      # API service layer
│   │   └── data/          # Static data
│   └── package.json
├── Backend/           # TypeScript/Node.js API
│   ├── src/
│   │   ├── controllers/   # Route controllers
│   │   ├── models/        # Database models
│   │   ├── routes/        # API routes
│   │   ├── middleware/    # Custom middleware
│   │   ├── types/         # TypeScript types
│   │   └── utils/         # Utility functions
│   └── package.json
└── INTEGRATION_GUIDE.md
```

## 🚀 Quick Start

### 1. Backend Setup

```bash
# Navigate to backend directory
cd Backend

# Install dependencies and setup
npm run setup

# Start MongoDB (make sure it's installed)
# On macOS with Homebrew: brew services start mongodb-community
# On Windows: net start MongoDB
# On Linux: sudo systemctl start mongod

# Seed the database with sample data
npm run seed

# Start development server
npm run dev
```

The backend will be available at: `http://localhost:5000`

### 2. Frontend Setup

```bash
# Navigate to frontend directory
cd Frontend

# Install dependencies
npm install

# Create environment file
echo "REACT_APP_API_URL=http://localhost:5000/api" > .env

# Start development server
npm start
```

The frontend will be available at: `http://localhost:3000`

## 🔧 Configuration

### Backend Environment Variables (.env)

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/watch-store

# JWT Secret (change this in production)
JWT_SECRET=watch-store-super-secret-jwt-key-2024
JWT_EXPIRES_IN=7d

# CORS
FRONTEND_URL=http://localhost:3000
```

### Frontend Environment Variables (.env)

```env
# API Configuration
REACT_APP_API_URL=http://localhost:5000/api
```

## 📡 API Integration

### Authentication Flow

1. **User Registration/Login**
   - Frontend sends credentials to `/api/auth/register` or `/api/auth/login`
   - Backend returns JWT token and user data
   - Frontend stores token in localStorage
   - Token is included in subsequent API requests

2. **Protected Routes**
   - Frontend checks authentication status using `useAuth` hook
   - Backend validates JWT token on protected endpoints
   - Automatic token refresh handling

### Order Management Flow

1. **Cart to Order Conversion**
   - User adds items to cart (stored in localStorage)
   - At checkout, cart items are sent to `/api/orders`
   - Backend validates products and creates order
   - Frontend displays order confirmation

2. **Order Status Tracking**
   - Orders have status: pending → processing → shipped → delivered
   - Users can view order history at `/orders`
   - Real-time status updates (can be extended with WebSockets)

## 🔐 Security Features

### Backend Security
- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcryptjs with salt rounds
- **Rate Limiting**: Prevents API abuse
- **CORS**: Configured for frontend domain
- **Input Validation**: express-validator for request validation
- **Helmet**: Security headers

### Frontend Security
- **Token Storage**: JWT stored in localStorage
- **Automatic Logout**: On token expiration
- **Protected Routes**: Authentication required for sensitive pages
- **Input Sanitization**: Form validation and sanitization

## 📊 Database Schema

### Users Collection
```javascript
{
  _id: ObjectId,
  email: String (unique),
  password: String (hashed),
  firstName: String,
  lastName: String,
  phone: String (optional),
  addresses: [AddressSchema],
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Products Collection
```javascript
{
  _id: ObjectId,
  name: String,
  price: Number,
  image: String,
  description: String,
  brand: String,
  category: String,
  movement: String,
  caseMaterial: String,
  caseSize: String,
  waterResistance: String,
  warranty: String,
  features: [String],
  specifications: Map,
  inStock: Boolean,
  stockCount: Number,
  rating: Number,
  reviews: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### Orders Collection
```javascript
{
  _id: ObjectId,
  user: ObjectId (ref: User),
  orderNumber: String (unique),
  items: [OrderItemSchema],
  shippingAddress: AddressSchema,
  billingAddress: AddressSchema (optional),
  paymentMethod: String,
  subtotal: Number,
  tax: Number,
  shipping: Number,
  total: Number,
  status: String (enum),
  trackingNumber: String (optional),
  notes: String (optional),
  createdAt: Date,
  updatedAt: Date
}
```

## 🛠️ Development Workflow

### Adding New Features

1. **Backend Changes**
   - Add/modify models in `src/models/`
   - Create/update controllers in `src/controllers/`
   - Define routes in `src/routes/`
   - Add validation middleware if needed
   - Update TypeScript types in `src/types/`

2. **Frontend Changes**
   - Add API methods to `src/services/api.js`
   - Create/update React components
   - Add new routes to `App.js`
   - Update contexts if needed

### Testing the Integration

1. **User Registration**
   ```bash
   curl -X POST http://localhost:5000/api/auth/register \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com","password":"password123","firstName":"John","lastName":"Doe"}'
   ```

2. **User Login**
   ```bash
   curl -X POST http://localhost:5000/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com","password":"password123"}'
   ```

3. **Get Products**
   ```bash
   curl http://localhost:5000/api/products
   ```

4. **Create Order** (requires authentication)
   ```bash
   curl -X POST http://localhost:5000/api/orders \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer YOUR_JWT_TOKEN" \
     -d '{"items":[{"productId":"PRODUCT_ID","quantity":1}],"shippingAddress":{...},"paymentMethod":"credit-card"}'
   ```

## 🚀 Production Deployment

### Backend Deployment
1. Set `NODE_ENV=production`
2. Use production MongoDB instance
3. Set secure JWT secret
4. Configure proper CORS origins
5. Use process manager (PM2)
6. Set up reverse proxy (nginx)
7. Enable HTTPS

### Frontend Deployment
1. Update `REACT_APP_API_URL` to production API URL
2. Build the application: `npm run build`
3. Deploy to static hosting (Netlify, Vercel, etc.)
4. Configure redirects for React Router

## 🔍 Troubleshooting

### Common Issues

1. **CORS Errors**
   - Check `FRONTEND_URL` in backend .env
   - Ensure frontend is running on correct port

2. **Authentication Issues**
   - Verify JWT secret is consistent
   - Check token expiration
   - Ensure Authorization header format: `Bearer TOKEN`

3. **Database Connection**
   - Verify MongoDB is running
   - Check `MONGODB_URI` in .env
   - Ensure database permissions

4. **API Not Responding**
   - Check backend server is running on correct port
   - Verify API endpoints in frontend service
   - Check network connectivity

### Debug Commands

```bash
# Check backend health
curl http://localhost:5000/api/health

# Check MongoDB connection
mongo --eval "db.adminCommand('ismaster')"

# View backend logs
npm run dev # in Backend directory

# View frontend logs
npm start # in Frontend directory
```

## 📚 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile (protected)
- `PUT /api/auth/profile` - Update user profile (protected)

### Product Endpoints
- `GET /api/products` - Get all products (with filtering)
- `GET /api/products/:id` - Get product by ID
- `GET /api/products/featured` - Get featured products
- `GET /api/products/categories` - Get all categories
- `GET /api/products/brands` - Get all brands

### Order Endpoints
- `POST /api/orders` - Create new order (protected)
- `GET /api/orders/my-orders` - Get user's orders (protected)
- `GET /api/orders/:id` - Get order by ID (protected)
- `PATCH /api/orders/:id/cancel` - Cancel order (protected)

### Admin Endpoints
- `GET /api/orders` - Get all orders (admin)
- `PATCH /api/orders/:id/status` - Update order status (admin)

## 🎯 Next Steps

1. **Add Admin Panel**: Create admin interface for order management
2. **Payment Integration**: Integrate with Stripe/PayPal
3. **Email Notifications**: Send order confirmations and updates
4. **Real-time Updates**: WebSocket integration for order status
5. **Search Enhancement**: Elasticsearch integration
6. **Image Upload**: Product image management
7. **Reviews System**: Customer reviews and ratings
8. **Inventory Management**: Stock tracking and alerts

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

---

For additional help or questions, please refer to the individual README files in the Frontend and Backend directories.