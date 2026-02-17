# How to Start Your Watch Store

## Step 1: Start Backend Server

Open a terminal and run:

```cmd
cd Backend
npm run dev
```

Wait for the message: `✅ MongoDB connected successfully` and `🚀 Server running on port 5000`

## Step 2: Start Frontend Server

Open a NEW terminal and run:

```cmd
cd Frontend
npm start
```

The browser will automatically open at http://localhost:3000

## Step 3: Login to Admin Dashboard

1. Go to: http://localhost:3000/admin/login
2. Use these credentials:
   - **Email**: admin@watchstore.com
   - **Password**: admin123

## Troubleshooting

### "Invalid credentials" error
- Make sure the backend server is running (Step 1)
- Check the backend terminal for any errors
- Verify you're using: admin@watchstore.com / admin123

### Backend won't start
```cmd
cd Backend
npm install
npm run dev
```

### Frontend won't start
```cmd
cd Frontend
npm install
npm start
```

### Reset admin password
```cmd
cd Backend
npx ts-node src/scripts/resetAdminPassword.ts
```

## Quick Test

Test if backend is working:
```cmd
curl http://localhost:5000/api/products
```

You should see a JSON response with 6 products.
