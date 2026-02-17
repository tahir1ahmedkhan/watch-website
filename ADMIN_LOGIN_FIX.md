# Admin Login Fix - Complete Guide

## The Issue
The admin login was failing because of validation middleware normalizing the email.

## What I Fixed
1. ✅ Reset admin password to `admin123`
2. ✅ Updated AdminLogin.jsx to show correct password
3. ✅ Removed `normalizeEmail()` from admin validation
4. ✅ Added proper validation error handling

## How to Start and Login

### Step 1: Kill any process on port 5000
```cmd
for /f "tokens=5" %a in ('netstat -aon ^| find ":5000" ^| find "LISTENING"') do taskkill /F /PID %a
```

### Step 2: Start Backend
Open a terminal and run:
```cmd
cd Backend
npm run dev
```

Wait for these messages:
- ✅ MongoDB connected successfully
- 🚀 Server running on port 5000

### Step 3: Start Frontend
Open a NEW terminal and run:
```cmd
cd Frontend
npm start
```

### Step 4: Login to Admin Dashboard

1. Go to: **http://localhost:3000/admin/login**
2. Enter credentials:
   - **Email**: `admin@watchstore.com`
   - **Password**: `admin123`
3. Click "Sign In"

## If Login Still Fails

### Option 1: Test the API directly
```cmd
curl -X POST http://localhost:5000/api/admin/login -H "Content-Type: application/json" -d "{\"email\":\"admin@watchstore.com\",\"password\":\"admin123\"}"
```

You should see a success response with a token.

### Option 2: Reset Password Again
```cmd
cd Backend
npx ts-node src/scripts/resetAdminPassword.ts
```

### Option 3: Check Admin Exists
```cmd
cd Backend
npx ts-node src/scripts/listAdmins.ts
```

## Troubleshooting

### Backend won't start - Port in use
```cmd
netstat -ano | findstr :5000
taskkill /F /PID <PID_NUMBER>
```

### Clear browser cache
- Press Ctrl+Shift+Delete
- Clear cached images and files
- Or use Incognito mode

### Check backend logs
Look for these messages in the backend terminal:
```
Admin login attempt: { email: 'admin@watchstore.com', passwordLength: 8 }
Admin found: Yes
Password valid: true
```

If you see "Admin found: No", the email might be getting modified.

## Quick Start Script

I created `start-backend.bat` for you. Just double-click it to start the backend automatically!

## Admin Credentials (Final)
- **Email**: admin@watchstore.com  
- **Password**: admin123
- **Role**: super-admin
