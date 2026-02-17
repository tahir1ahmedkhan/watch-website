# MongoDB Atlas Connection Guide

## 🔗 Current Connection

Your watch store is connected to MongoDB Atlas cloud database.

### Connection String
```
mongodb+srv://tahirahmedkhan7_db_user:Q0VYXM3wwxoIrRdt@cluster0.ddxdp4q.mongodb.net/watch-store
```

### Database Details
- **Cluster**: Cluster0
- **Database Name**: watch-store
- **Username**: tahirahmedkhan7_db_user
- **Region**: Cloud-hosted (MongoDB Atlas)

## 🔐 Default Admin Credentials

These credentials are stored in `Backend/.env` and used to seed the admin account:

```
Email: admin@watchstore.com
Password: admin123
```

### Environment Variables
```env
# Database - MongoDB Atlas
MONGODB_URI=mongodb+srv://tahirahmedkhan7_db_user:Q0VYXM3wwxoIrRdt@cluster0.ddxdp4q.mongodb.net/watch-store

# Default Admin Credentials
ADMIN_EMAIL=admin@watchstore.com
ADMIN_PASSWORD=admin123
```

## 📊 Database Collections

Your MongoDB Atlas database contains 4 collections:

### 1. **admins** Collection
- Stores admin user accounts
- Fields: email, password (hashed), firstName, lastName, role, isActive
- Current admin: admin@watchstore.com

### 2. **users** Collection
- Stores customer accounts
- Fields: email, password (hashed), firstName, lastName, phone, addresses
- Currently has 5 sample users

### 3. **products** Collection
- Stores watch products
- Fields: name, price, image, description, brand, category, movement, etc.
- Currently has 8 products

### 4. **orders** Collection
- Stores customer orders
- Fields: user, orderNumber, items, shippingAddress, status, total, etc.
- Currently has 7 orders

## 🚀 How to Access MongoDB Atlas

### Option 1: MongoDB Compass (GUI)
1. Download MongoDB Compass: https://www.mongodb.com/products/compass
2. Open Compass
3. Paste connection string:
   ```
   mongodb+srv://tahirahmedkhan7_db_user:Q0VYXM3wwxoIrRdt@cluster0.ddxdp4q.mongodb.net/watch-store
   ```
4. Click "Connect"
5. Browse your collections

### Option 2: MongoDB Atlas Web Interface
1. Go to: https://cloud.mongodb.com/
2. Login with your MongoDB Atlas account
3. Select your cluster: Cluster0
4. Click "Browse Collections"
5. View and manage data

### Option 3: MongoDB Shell (CLI)
```bash
mongosh "mongodb+srv://cluster0.ddxdp4q.mongodb.net/watch-store" --username tahirahmedkhan7_db_user
```

## 🔄 Seeding the Database

### Seed Everything (Recommended)
Creates admin, users, products, and orders:
```cmd
cd Backend
npx ts-node src/scripts/seedAll.ts
```

### Seed Only Products
```cmd
cd Backend
npx ts-node src/scripts/seedDatabase.ts
```

### Create/Reset Admin Only
```cmd
cd Backend
npx ts-node src/scripts/resetAdminPassword.ts
```

## 📝 Verify Connection

### Test Backend Connection
```cmd
cd Backend
npm run dev
```

Look for this message:
```
✅ MongoDB connected successfully
```

### Test API Endpoint
```cmd
curl http://localhost:5000/api/products
```

Should return JSON with 8 products.

### Test Admin Login
```cmd
curl -X POST http://localhost:5000/api/admin/login ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"admin@watchstore.com\",\"password\":\"admin123\"}"
```

Should return success with a JWT token.

## 🔒 Security Notes

### Current Setup
- ✅ Passwords are hashed with bcrypt (12 salt rounds)
- ✅ JWT tokens for authentication
- ✅ CORS enabled for frontend
- ✅ Helmet.js for security headers
- ✅ Rate limiting on API endpoints

### Production Recommendations
1. **Change default admin password** after first login
2. **Use environment variables** for sensitive data (already done)
3. **Enable MongoDB Atlas IP whitelist** for production
4. **Rotate JWT secret** regularly
5. **Enable MongoDB Atlas backup** for data protection
6. **Use stronger passwords** for production admin accounts

## 🛠️ Troubleshooting

### Connection Failed
1. Check internet connection
2. Verify MongoDB Atlas cluster is running
3. Check if IP address is whitelisted in Atlas
4. Verify credentials in `.env` file

### Admin Login Not Working
1. Ensure backend server is running
2. Run reset admin script:
   ```cmd
   cd Backend
   npx ts-node src/scripts/resetAdminPassword.ts
   ```
3. Check backend logs for errors
4. Verify MongoDB connection is successful

### No Data Showing
1. Run the seed script:
   ```cmd
   cd Backend
   npx ts-node src/scripts/seedAll.ts
   ```
2. Check MongoDB Atlas to verify data exists
3. Restart backend server

## 📚 Useful Scripts

All scripts are located in `Backend/src/scripts/`:

| Script | Purpose | Command |
|--------|---------|---------|
| `seedAll.ts` | Seed everything | `npx ts-node src/scripts/seedAll.ts` |
| `seedDatabase.ts` | Seed products only | `npx ts-node src/scripts/seedDatabase.ts` |
| `seedAdmin.ts` | Create admin | `npx ts-node src/scripts/seedAdmin.ts` |
| `resetAdminPassword.ts` | Reset admin password | `npx ts-node src/scripts/resetAdminPassword.ts` |
| `listAdmins.ts` | List all admins | `npx ts-node src/scripts/listAdmins.ts` |
| `checkAdmin.ts` | Check admin credentials | `npx ts-node src/scripts/checkAdmin.ts` |

## 🎯 Quick Start Checklist

- [x] MongoDB Atlas connection configured
- [x] Admin credentials set in `.env`
- [x] Database seeded with sample data
- [x] Backend can connect to MongoDB
- [x] Admin login working
- [x] Products API working
- [x] Orders API working

## 📞 Support

If you encounter issues:
1. Check backend console for error messages
2. Verify `.env` file has correct values
3. Ensure MongoDB Atlas cluster is active
4. Run seed scripts to populate data
5. Check MongoDB Atlas dashboard for connection logs

---

**Last Updated**: February 2026
**Database**: MongoDB Atlas - Cluster0
**Admin Email**: admin@watchstore.com
**Admin Password**: admin123
