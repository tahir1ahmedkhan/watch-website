# Fix: No Products Showing on Frontend

## Issue
Products are not displaying on the frontend pages (Home, Products, Product Details).

## Possible Causes & Solutions

### 1. Database is Empty (Most Likely)

The database might not have any products. You need to seed the database first.

**Solution:**
```bash
# Navigate to Backend folder
cd Backend

# Run the seed script
npm run seed
# OR
node -r ts-node/register src/scripts/seedDatabase.ts
```

This will populate your database with 6 sample watches.

### 2. Backend Server Not Running

Make sure your backend server is running.

**Solution:**
```bash
cd Backend
npm start
# OR
npm run dev
```

The server should be running on `http://localhost:5000`

### 3. Frontend API URL Not Configured

Check if the frontend is pointing to the correct backend URL.

**Solution:**
Check `Frontend/.env` file:
```
REACT_APP_API_URL=http://localhost:5000/api
```

If this file doesn't exist, create it with the above content.

### 4. CORS Issues

If the backend and frontend are running but can't communicate.

**Solution:**
Check `Backend/src/server.ts` has CORS enabled:
```typescript
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
```

### 5. MongoDB Connection Issues

Check if MongoDB is connected properly.

**Solution:**
Check `Backend/.env` file has:
```
MONGODB_URI=your_mongodb_connection_string
```

## Debugging Steps

1. **Open Browser Console** (F12) and check for errors
2. **Check Network Tab** to see if API calls are being made
3. **Look for console logs** - I added debug logs that will show:
   - "Fetching products..."
   - "API Response: {...}"
   - "Products: [...]"

4. **Test Backend API Directly**
   Open browser and go to: `http://localhost:5000/api/products`
   You should see JSON response with products

5. **Check Backend Console** for any errors

## Quick Fix Commands

Run these in order:

```bash
# 1. Seed the database
cd Backend
npm run seed

# 2. Start backend (in one terminal)
npm start

# 3. Start frontend (in another terminal)
cd ../Frontend
npm start
```

## Verify It's Working

1. Backend test: Visit `http://localhost:5000/api/products` - should show products JSON
2. Frontend test: Visit `http://localhost:3000` - should show products
3. Check browser console for debug logs

## If Still Not Working

Check the browser console logs and share:
1. Any error messages
2. The "API Response" log output
3. The "Products" log output

This will help identify the exact issue.
