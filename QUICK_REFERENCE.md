# 🚀 Quick Reference Guide

## 🔐 Default Admin Credentials

```
Email: admin@watchstore.com
Password: admin123
```

**Admin Dashboard**: http://localhost:3000/admin/login

---

## 🗄️ MongoDB Atlas Connection

```
mongodb+srv://tahirahmedkhan7_db_user:Q0VYXM3wwxoIrRdt@cluster0.ddxdp4q.mongodb.net/watch-store
```

**Database Name**: watch-store  
**Cluster**: Cluster0

---

## 👥 Sample User Accounts

All users have password: `password123`

1. john.doe@example.com
2. jane.smith@example.com
3. mike.johnson@example.com
4. sarah.williams@example.com
5. david.brown@example.com

---

## 🚀 Start Servers

### Backend
```cmd
cd Backend
npm run dev
```
Server runs on: http://localhost:5000

### Frontend
```cmd
cd Frontend
npm start
```
App runs on: http://localhost:3000

---

## 🌱 Seed Database

### Seed Everything (Recommended)
```cmd
cd Backend
npx ts-node src/scripts/seedAll.ts
```

Creates:
- 1 Admin
- 5 Users
- 8 Products
- 7 Orders

### Seed Only Products
```cmd
cd Backend
npm run seed
```

### Reset Admin Password
```cmd
cd Backend
npx ts-node src/scripts/resetAdminPassword.ts
```

---

## 📊 Database Collections

| Collection | Count | Description |
|------------|-------|-------------|
| admins | 1 | Admin accounts |
| users | 5 | Customer accounts |
| products | 8 | Watch products |
| orders | 7 | Customer orders |

---

## 🔗 Important URLs

| Service | URL |
|---------|-----|
| Frontend | http://localhost:3000 |
| Backend API | http://localhost:5000/api |
| Admin Login | http://localhost:3000/admin/login |
| Products API | http://localhost:5000/api/products |
| Health Check | http://localhost:5000/api/health |

---

## 🛠️ Useful Commands

### Check Admin Exists
```cmd
cd Backend
npx ts-node src/scripts/listAdmins.ts
```

### Test Admin Login
```cmd
cd Backend
npx ts-node src/scripts/checkAdmin.ts
```

### Test API
```cmd
curl http://localhost:5000/api/products
```

### Kill Port 5000 (if blocked)
```cmd
for /f "tokens=5" %a in ('netstat -aon ^| find ":5000" ^| find "LISTENING"') do taskkill /F /PID %a
```

---

## 📁 Key Files

| File | Purpose |
|------|---------|
| `Backend/.env` | Environment variables & credentials |
| `Backend/src/server.ts` | Main backend server |
| `Backend/src/scripts/seedAll.ts` | Complete database seeding |
| `Frontend/src/pages/AdminLogin.jsx` | Admin login page |
| `MONGODB_ATLAS_SETUP.md` | Detailed MongoDB guide |
| `DATABASE_SEEDED.md` | Database seeding summary |

---

## ⚡ Quick Troubleshooting

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

### Admin login fails
1. Check backend is running
2. Reset admin password:
   ```cmd
   cd Backend
   npx ts-node src/scripts/resetAdminPassword.ts
   ```

### No products showing
```cmd
cd Backend
npx ts-node src/scripts/seedAll.ts
```

### Port 5000 in use
```cmd
netstat -ano | findstr :5000
taskkill /F /PID <PID_NUMBER>
```

---

## 📦 Environment Variables

Located in `Backend/.env`:

```env
# Server
PORT=5000
NODE_ENV=development

# MongoDB Atlas
MONGODB_URI=mongodb+srv://tahirahmedkhan7_db_user:Q0VYXM3wwxoIrRdt@cluster0.ddxdp4q.mongodb.net/watch-store

# Default Admin Credentials
ADMIN_EMAIL=admin@watchstore.com
ADMIN_PASSWORD=admin123

# JWT
JWT_SECRET=watch-store-super-secret-jwt-key-2024
JWT_EXPIRES_IN=7d

# CORS
FRONTEND_URL=http://localhost:3000

# Supabase (for images)
SUPABASE_URL=https://hsrcbmqmtxnzxdwgenkm.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_BUCKET_NAME=watch-website-images
```

---

## 🎯 Testing Checklist

- [ ] Backend starts successfully
- [ ] Frontend starts successfully
- [ ] Can view products at http://localhost:3000/products
- [ ] Can login as admin at http://localhost:3000/admin/login
- [ ] Admin dashboard shows statistics
- [ ] Can view users in admin panel
- [ ] Can view orders in admin panel
- [ ] MongoDB Atlas connection working

---

**Last Updated**: February 2026  
**Version**: 1.0.0
