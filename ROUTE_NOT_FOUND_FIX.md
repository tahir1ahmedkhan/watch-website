# "Route Not Found" Error - Complete Fix Guide

## 🔴 Problem

When clicking "Create Product" button, you get "Route not found" error.

## ✅ Solution

The routes are properly configured, but the backend needs to be restarted with the latest compiled code.

## 🔧 Step-by-Step Fix

### Step 1: Stop Backend (If Running)

If backend is running, stop it:
- Press `Ctrl+C` in the backend terminal

### Step 2: Rebuild Backend

```bash
cd Backend
npm run build
```

You should see:
```
> watch-store-backend@1.0.0 build
> tsc

(No errors)
```

### Step 3: Start Backend

```bash
npm run dev
```

You should see:
```
✅ MongoDB connected successfully
✅ Supabase configured successfully (or warning if not configured)
🚀 Server running on port 5000
📱 Frontend URL: http://localhost:3000
🔗 API Base URL: http://localhost:5000/api
```

### Step 4: Verify Routes

Open a new terminal and test:

```bash
curl http://localhost:5000/api/health
```

Should return:
```json
{
  "success": true,
  "message": "Watch Store API is running",
  "timestamp": "..."
}
```

### Step 5: Test Admin Login

```bash
curl -X POST http://localhost:5000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"email":"your-admin@email.com","password":"your-password"}'
```

Should return admin token.

### Step 6: Test Product Routes

Get your admin token from login, then:

```bash
# Get products
curl http://localhost:5000/api/admin/products \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

Should return products list (may be empty).

### Step 7: Test Frontend

1. Start frontend (if not running):
   ```bash
   cd Frontend
   npm start
   ```

2. Go to `http://localhost:3000/admin/login`

3. Login with admin credentials

4. Click **Products** tab

5. Click **Add Product**

6. Fill form with:
   - Name: Test Watch
   - Price: 999
   - Brand: Test Brand
   - Category: Luxury
   - Movement: Automatic
   - Case Material: Steel
   - Case Size: 42mm
   - Water Resistance: 100m
   - Warranty: 2 Years
   - Stock Count: 5
   - Description: Test product
   - Image URL: `https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800`

7. Click **Create Product**

8. ✅ Should see "Product created successfully!"

## 🐛 If Still Getting "Route Not Found"

### Check 1: Backend is Running

Terminal should show:
```
🚀 Server running on port 5000
```

If not, start it: `npm run dev`

### Check 2: Correct Port

Backend should be on port 5000.

Check `Backend/.env`:
```env
PORT=5000
```

### Check 3: Frontend API URL

Check `Frontend/.env`:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

If file doesn't exist, create it.

### Check 4: CORS Configuration

Backend should allow frontend origin.

Check `Backend/.env`:
```env
FRONTEND_URL=http://localhost:3000
```

### Check 5: Admin Token

Open browser console (F12) and check:
```javascript
localStorage.getItem('adminToken')
```

Should return a JWT token. If null, login again.

### Check 6: Network Tab

1. Open browser DevTools (F12)
2. Go to Network tab
3. Click "Create Product"
4. Look for the request to `/api/admin/products`
5. Check:
   - **Request URL**: Should be `http://localhost:5000/api/admin/products`
   - **Status**: Should be 201 (Created) or 200 (OK)
   - **Response**: Should have `success: true`

If you see:
- **404 Not Found**: Backend routes not registered (rebuild backend)
- **401 Unauthorized**: Token invalid (login again)
- **500 Internal Server Error**: Check backend terminal for error
- **Network Error**: Backend not running

## 🔍 Debugging Steps

### 1. Check Backend Logs

Backend terminal should show:
```
POST /api/admin/products 201 (when creating)
GET /api/admin/products 200 (when loading)
PUT /api/admin/products/:id 200 (when updating)
DELETE /api/admin/products/:id 200 (when deleting)
```

### 2. Check Browser Console

Press F12, look for errors:
```
Network Error → Backend not running
401 Unauthorized → Login again
400 Bad Request → Check form fields
```

### 3. Test with cURL

```bash
# Get admin token first
TOKEN="your-token-here"

# Test create product
curl -X POST http://localhost:5000/api/admin/products \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Watch",
    "price": 999,
    "brand": "Test",
    "category": "Luxury",
    "movement": "Automatic",
    "caseMaterial": "Steel",
    "caseSize": "42mm",
    "waterResistance": "100m",
    "warranty": "2 Years",
    "stockCount": 5,
    "description": "Test",
    "inStock": true,
    "image": "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800"
  }'
```

Should return:
```json
{
  "success": true,
  "message": "Product created successfully",
  "data": { ... }
}
```

## ✅ Verification Checklist

- [ ] Backend rebuilt (`npm run build`)
- [ ] Backend running on port 5000
- [ ] MongoDB connected
- [ ] Health check works (`/api/health`)
- [ ] Admin login works
- [ ] Admin token in localStorage
- [ ] Frontend running on port 3000
- [ ] Can access admin dashboard
- [ ] Products tab visible
- [ ] "Add Product" button opens modal
- [ ] Can fill form
- [ ] "Create Product" button works
- [ ] Product appears in table

## 🎯 Expected Behavior

### When Creating Product:

1. Click "Create Product"
2. Loading state (button disabled)
3. API call to `POST /api/admin/products`
4. Backend processes request
5. Saves to MongoDB
6. Returns success response
7. Alert: "Product created successfully!"
8. Modal closes
9. Table refreshes
10. New product appears

### Backend Terminal Shows:

```
POST /api/admin/products 201 123ms
```

### Browser Console Shows:

```
Product created successfully!
```

## 🚀 Quick Fix Commands

```bash
# Stop everything
# Press Ctrl+C in both terminals

# Rebuild backend
cd Backend
npm run build
npm run dev

# In new terminal, start frontend
cd Frontend
npm start

# Test
# Go to http://localhost:3000/admin/login
# Login → Products → Add Product → Create
```

## 📞 Still Not Working?

### Check These Files:

1. **Backend/src/routes/index.ts**
   - Should have: `router.use('/admin', adminRoutes);`

2. **Backend/src/routes/admin.ts**
   - Should have product routes (GET, POST, PUT, DELETE)

3. **Backend/src/controllers/productController.ts**
   - Should have: createProduct, updateProduct, deleteProduct functions

4. **Backend/dist/** folder
   - Should exist with compiled .js files
   - If missing, run `npm run build`

### Restart Everything:

```bash
# Kill all node processes
# Windows:
taskkill /F /IM node.exe

# Then start fresh:
cd Backend
npm run build
npm run dev

# New terminal:
cd Frontend
npm start
```

## 🎉 Success Indicators

✅ Backend shows: `POST /api/admin/products 201`
✅ Alert shows: "Product created successfully!"
✅ Product appears in table with image
✅ No errors in console
✅ Can edit and delete products

---

**If you followed all steps and it still doesn't work, check the backend terminal for specific error messages and share them for further debugging.**
