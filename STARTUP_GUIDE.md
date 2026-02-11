# Complete Startup Guide - Fix No Products Issue

## The Problem
Products aren't showing because the database is likely empty. Follow these steps to fix it.

## Step-by-Step Solution

### Step 1: Seed the Database (IMPORTANT!)

Open a terminal in the Backend folder and run:

```bash
cd Backend
npm run seed
```

You should see output like:
```
🌱 Starting database seeding...
🗑️  Cleared existing products
✅ Inserted 6 products
🎉 Database seeding completed successfully!
1. Rolex Submariner - 1200 (Rolex)
2. Apple Watch Series 9 - 499 (Apple)
3. Casio G-Shock - 199 (Casio)
4. Omega Speedmaster - 3500 (Omega)
5. TAG Heuer Formula 1 - 1100 (TAG Heuer)
6. Seiko Prospex - 350 (Seiko)
```

### Step 2: Start the Backend Server

In the same terminal (or a new one):

```bash
cd Backend
npm run build
npm start
```

Or for development mode:
```bash
npm run dev
```

The server should start on `http://localhost:5000`

### Step 3: Start the Frontend

Open a NEW terminal and run:

```bash
cd Frontend
npm start
```

The frontend should open at `http://localhost:3000`

### Step 4: Verify It's Working

1. **Test Backend API:**
   - Open browser: `http://localhost:5000/api/products`
   - You should see JSON with 6 products

2. **Test Frontend:**
   - Open browser: `http://localhost:3000`
   - You should see products on the home page
   - Go to Products page - should show all 6 watches

3. **Check Browser Console (F12):**
   - Look for debug logs:
     - "Fetching products..."
     - "API Response: {success: true, ...}"
     - "Products: [6 items]"

## Common Issues & Fixes

### Issue: "Cannot connect to MongoDB"
**Fix:** Check `Backend/.env` file has valid `MONGODB_URI`

### Issue: "CORS error"
**Fix:** Make sure backend is running on port 5000 and frontend on port 3000

### Issue: "Products array is empty"
**Fix:** Run the seed command again: `npm run seed`

### Issue: "API_URL not defined"
**Fix:** Create `Frontend/.env` with:
```
REACT_APP_API_URL=http://localhost:5000/api
```

## Quick Test Commands

Test if backend is responding:
```bash
# Windows (PowerShell)
Invoke-WebRequest -Uri http://localhost:5000/api/products

# Windows (CMD)
curl http://localhost:5000/api/products
```

## What Changed

I updated these files to fetch from API instead of static data:
- `Frontend/src/pages/Products.jsx` - Now fetches all products from API
- `Frontend/src/pages/Home.jsx` - Now fetches featured products from API
- `Frontend/src/pages/ProductDetails.jsx` - Now fetches individual product from API

All pages now include:
- Loading states
- Error handling
- Debug console logs
- Proper data parsing

## Next Steps

After products are showing:
1. You can add/edit/delete products from Admin Dashboard
2. Changes will immediately reflect on user-facing pages
3. No need to restart servers - just refresh the page

## Need Help?

If products still don't show:
1. Open browser console (F12)
2. Check the Console tab for errors
3. Check the Network tab to see API calls
4. Share any error messages you see
