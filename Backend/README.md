# Watch Store Backend API

A comprehensive TypeScript backend for the watch store application with user authentication, product management, and order processing.

## Features

- **User Authentication**: JWT-based authentication with registration and login
- **Product Management**: Complete product catalog with search, filtering, and categorization
- **Order Management**: Full order lifecycle with status tracking (pending, processing, shipped, delivered, cancelled)
- **Address Management**: Support for shipping and billing addresses
- **Security**: Helmet, CORS, rate limiting, and input validation
- **Database**: MongoDB with Mongoose ODM
- **TypeScript**: Full type safety throughout the application

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: express-validator
- **Security**: Helmet, CORS, bcryptjs
- **Development**: Nodemon, ts-node

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile (protected)
- `PUT /api/auth/profile` - Update user profile (protected)

### Products
- `GET /api/products` - Get all products with filtering and pagination
- `GET /api/products/:id` - Get product by ID
- `GET /api/products/featured` - Get featured products
- `GET /api/products/categories` - Get all categories
- `GET /api/products/brands` - Get all brands

### Orders
- `POST /api/orders` - Create new order (protected)
- `GET /api/orders/my-orders` - Get user's orders (protected)
- `GET /api/orders/:id` - Get order by ID (protected)
- `PATCH /api/orders/:id/cancel` - Cancel order (protected)
- `GET /api/orders` - Get all orders (admin)
- `PATCH /api/orders/:id/status` - Update order status (admin)

### Health Check
- `GET /api/health` - API health check

## Installation

1. **Clone the repository**
   ```bash
   cd Backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` with your configuration:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/watch-store
   JWT_SECRET=your-super-secret-jwt-key-here
   JWT_EXPIRES_IN=7d
   FRONTEND_URL=http://localhost:3000
   ```

4. **Start MongoDB**
   Make sure MongoDB is running on your system.

5. **Seed the database** (optional)
   ```bash
   npm run seed
   ```

6. **Start the development server**
   ```bash
   npm run dev
   ```

The server will start on `http://localhost:5000`

## Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm run seed` - Seed database with sample data

## Project Structure

```
Backend/
├── src/
│   ├── controllers/          # Route controllers
│   │   ├── authController.ts
│   │   ├── orderController.ts
│   │   └── productController.ts
│   ├── middleware/           # Custom middleware
│   │   ├── auth.ts
│   │   └── validation.ts
│   ├── models/              # Database models
│   │   ├── User.ts
│   │   ├── Product.ts
│   │   └── Order.ts
│   ├── routes/              # API routes
│   │   ├── auth.ts
│   │   ├── orders.ts
│   │   ├── products.ts
│   │   └── index.ts
│   ├── scripts/             # Utility scripts
│   │   └── seedDatabase.ts
│   ├── types/               # TypeScript type definitions
│   │   └── index.ts
│   ├── utils/               # Utility functions
│   │   ├── database.ts
│   │   └── jwt.ts
│   └── server.ts            # Main server file
├── dist/                    # Compiled JavaScript (generated)
├── .env                     # Environment variables
├── .env.example            # Environment variables template
├── .gitignore              # Git ignore rules
├── package.json            # Dependencies and scripts
├── tsconfig.json           # TypeScript configuration
└── README.md               # This file
```

## Order Status Flow

1. **pending** - Order created, payment pending
2. **processing** - Payment confirmed, preparing for shipment
3. **shipped** - Order shipped, tracking number available
4. **delivered** - Order delivered to customer
5. **cancelled** - Order cancelled (only from pending status)

## Frontend Integration

The backend is designed to work seamlessly with the React frontend. Key integration points:

1. **Authentication**: JWT tokens for secure API access
2. **Product Data**: Compatible with existing frontend product structure
3. **Cart Integration**: Supports frontend cart functionality
4. **Order Management**: Complete order lifecycle support

## Security Features

- Password hashing with bcryptjs
- JWT token authentication
- Request rate limiting
- CORS configuration
- Input validation and sanitization
- Helmet for security headers

## Development

### Adding New Features

1. Create new models in `src/models/`
2. Add controllers in `src/controllers/`
3. Define routes in `src/routes/`
4. Add validation middleware if needed
5. Update TypeScript types in `src/types/`

### Database Schema

The application uses MongoDB with the following collections:
- **users**: User accounts and profiles
- **products**: Product catalog
- **orders**: Order history and details

## Production Deployment

1. Set `NODE_ENV=production`
2. Use a production MongoDB instance
3. Set secure JWT secret
4. Configure proper CORS origins
5. Use process manager like PM2
6. Set up reverse proxy (nginx)
7. Enable HTTPS

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the ISC License.