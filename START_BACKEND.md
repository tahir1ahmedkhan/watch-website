# Start Backend - Complete Guide

## 🚀 Quick Start

```bash
cd Backend
npm run build
npm run dev
```

## 📋 What Should Happen

### 1. Build Output
```
> watch-store-backend@1.0.0 build
> tsc

(No errors - if you see errors, fix them first)
```

### 2. Server Startup
```
✅ MongoDB connected successfully
Database: watch-store
⚠️ Supabase not configured (or ✅ if configured)
🚀 Server running on port 5000
📱 Frontend URL: http://localhost:3000
🔗 API Base URL: http://localhost:5000/api
📊 Health Check: http://localhost:5000/api/health
```

### 3. Routes Registered
The server should register these routes:
- `/api/auth/*` - Authentication routes
- `/api/products/*` - Public product routes
- `/api/orders/*` - Order routes
- `/api/admin/*` - Admin routes (including product management)

## ✅ Verify Backend is Working

### Test 1: Health Check
```bash
curl http://localhost:5000/api/health
```

Expected response:
```json
{
  "success": true,
  "message": "Watch Store API is running",
  "timestamp": "2024-..."
}
```

### Test 2: Admin Login
```bash
curl -X POST http://localhost:5000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"admin123"}'
```

Expected response:
```json
{
  "success": true,
  "message": "Admin login successful",
  "data": {
    "admin": { ... },
    "token": "eyJhbGc..."
  }
}
```

### Test 3: Get Products (with token)
```bash
curl http://localhost:5000/api/admin/products \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

Expected response:
```json
{
  "success": true,
  "message": "Products retrieved successfully",
  "data": {
    "products": [],
    "pagination": { ... }
  }
}
```

## 🐛 Common Issues

### Issue 1: "Cannot find module"

**Error:**
```
Error: Cannot find module './routes'
```

**Fix:**
```bash
npm run build
```

### Issue 2: "MongoDB connection failed"

**Error:**
```
❌ MongoDB connection failed
```

**Fix:**
1. Make sure MongoDB is running
2. Check `Backend/.env`:
   ```env
   MONGODB_URI=mongodb://localhost:27017/watch-store
   ```
3. Start MongoDB service

### Issue 3: "Port 5000 already in use"

**Error:**
```
Error: listen EADDRINUSE: address already in use :::5000
```

**Fix:**

**Windows:**
```bash
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

**Or change port in `.env`:**
```env
PORT=5001
```

### Issue 4: "Supabase error"

**Warning:**
```
⚠️ Supabase not configured
```

**This is OK!** You can use image URLs instead of file upload.

**To configure Supabase (optional):**
1. See `SUPABASE_SETUP_GUIDE.md`
2. Update `Backend/.env`:
   ```env
   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_ANON_KEY=your-key-here
   SUPABASE_BUCKET_NAME=product-images
   ```

## 📝 Environment Variables

Make sure `Backend/.env` has:

```env
# Server
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/watch-store

# JWT
JWT_SECRET=watch-store-super-secret-jwt-key-2024
JWT_EXPIRES_IN=7d

# CORS
FRONTEND_URL=http://localhost:3000

# Supabase (optional - for file upload)
SUPABASE_URL=your-supabase-project-url
SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_BUCKET_NAME=product-images
```

## 🔄 Restart Backend

If you make changes to code:

```bash
# Stop backend (Ctrl+C)
npm run build
npm run dev
```

## 🎯 Success Checklist

- [ ] `npm run build` completes without errors
- [ ] Server starts on port 5000
- [ ] MongoDB connects successfully
- [ ] Health check returns success
- [ ] Admin login works
- [ ] Product routes accessible
- [ ] No errors in terminal

## 🚀 Next Steps

Once backend is running:

1. **Start Frontend:**
   ```bash
   cd Frontend
   npm start
   ```

2. **Test Product Management:**
   - Go to http://localhost:3000/admin/login
   - Login with admin credentials
   - Click Products tab
   - Test Create, Edit, Delete buttons

## 📞 Need Help?

If backend won't start:

1. Check terminal for specific error message
2. Make sure MongoDB is running
3. Check all environment variables are set
4. Try deleting `node_modules` and `dist` folders, then:
   ```bash
   npm install
   npm run build
   npm run dev
   ```

---

**Backend should now be running and ready to handle product management requests!** ✅
