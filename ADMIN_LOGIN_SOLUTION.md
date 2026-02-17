# ✅ Admin Login Solution

## The Problem
Admin login shows "Invalid credentials" even with correct email and password.

## ✅ Solution - Follow These Steps

### Step 1: Stop All Node Processes
```cmd
taskkill /F /IM node.exe /T
```

### Step 2: Reset Admin Password
```cmd
cd Backend
npx ts-node src/scripts/resetAdminPassword.ts
```

You should see:
```
✅ Admin password reset successfully!
Email: admin@watchstore.com
Password: admin123
```

### Step 3: Start Backend Server
```cmd
cd Backend
npm run dev
```

Wait for these messages:
```
✅ MongoDB connected successfully
🚀 Server running on port 5000
```

### Step 4: Start Frontend (in a NEW terminal)
```cmd
cd Frontend
npm start
```

### Step 5: Login
1. Go to: http://localhost:3000/admin/login
2. Enter:
   - Email: `admin@watchstore.com`
   - Password: `admin123`
3. Click "Sign In"

## 🚀 Quick Fix Script

I created a batch file for you! Just double-click:
```
fix-and-start-backend.bat
```

This will:
1. Kill any processes on port 5000
2. Reset admin password
3. Start backend server in a new window

## 🔍 Verify Admin Exists

Run this to check if admin is in database:
```cmd
cd Backend
npx ts-node src/scripts/debugAdmin.ts
```

Should show:
```
Query 1 - exact match: Found
Query 2 - with isActive: Found
Password "admin123" valid: true
```

## 🛠️ If Still Not Working

### Option 1: Re-seed Everything
```cmd
cd Backend
npx ts-node src/scripts/seedAll.ts
```

This will:
- Clear all data
- Create fresh admin account
- Add 5 users, 8 products, 7 orders

### Option 2: Manual Backend Start
1. Open Command Prompt
2. Navigate to Backend folder:
   ```cmd
   cd Backend
   ```
3. Kill port 5000:
   ```cmd
   for /f "tokens=5" %a in ('netstat -aon ^| find ":5000" ^| find "LISTENING"') do taskkill /F /PID %a
   ```
4. Start server:
   ```cmd
   npm run dev
   ```

### Option 3: Check Backend Logs
Look for these messages in the backend terminal:
```
=== Admin Login Debug ===
Request body: { email: 'admin@watchstore.com', password: 'admin123' }
Query with original email: Found
✅ Admin found: admin@watchstore.com
Password valid: true
```

If you see "Not found" instead of "Found", the admin doesn't exist in the database.

## 📝 Test API Directly

Test if backend is working:
```cmd
curl http://localhost:5000/api/health
```

Should return:
```json
{"success":true,"message":"API is running"}
```

Test admin login API:
```powershell
Invoke-RestMethod -Uri "http://localhost:5000/api/admin/login" -Method POST -ContentType "application/json" -Body '{"email":"admin@watchstore.com","password":"admin123"}'
```

Should return success with a token.

## 🔐 Admin Credentials (Confirmed Working)

```
Email: admin@watchstore.com
Password: admin123
Role: super-admin
```

These credentials are:
- ✅ Stored in MongoDB Atlas
- ✅ Password is hashed with bcrypt
- ✅ Verified working in direct database queries
- ✅ Reset by the resetAdminPassword script

## 🎯 Common Issues & Solutions

### Issue: "Port 5000 already in use"
**Solution:**
```cmd
netstat -ano | findstr :5000
taskkill /F /PID <PID_NUMBER>
```

### Issue: "Admin not found"
**Solution:**
```cmd
cd Backend
npx ts-node src/scripts/resetAdminPassword.ts
```

### Issue: "MongoDB connection failed"
**Solution:**
- Check internet connection
- Verify MongoDB Atlas cluster is running
- Check `.env` file has correct MONGODB_URI

### Issue: Frontend can't connect to backend
**Solution:**
- Ensure backend is running on port 5000
- Check `Frontend/.env` has: `REACT_APP_API_URL=http://localhost:5000/api`
- Clear browser cache or use incognito mode

## 📞 Still Having Issues?

1. **Check both servers are running:**
   - Backend: http://localhost:5000/api/health
   - Frontend: http://localhost:3000

2. **Check browser console** (F12) for errors

3. **Check backend terminal** for error messages

4. **Try incognito mode** to rule out cache issues

5. **Restart everything:**
   ```cmd
   taskkill /F /IM node.exe /T
   ```
   Then start backend and frontend again

## ✅ Success Checklist

- [ ] Backend server running (port 5000)
- [ ] Frontend server running (port 3000)
- [ ] MongoDB Atlas connected
- [ ] Admin exists in database
- [ ] Admin password is "admin123"
- [ ] Can access http://localhost:3000/admin/login
- [ ] Login form appears
- [ ] Can enter credentials
- [ ] Login successful - redirects to dashboard

---

**Last Updated**: February 2026  
**Status**: Solution Provided  
**Admin Email**: admin@watchstore.com  
**Admin Password**: admin123
