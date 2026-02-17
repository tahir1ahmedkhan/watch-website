# 🚀 Deployment Checklist

## ✅ Pre-Deployment

- [x] Root package.json has "build" and "start" scripts
- [x] Backend has build script in package.json
- [x] Frontend has build script in package.json
- [x] MongoDB Atlas connection string ready
- [x] All environment variables documented
- [x] Code committed to GitHub

## 📦 Backend Deployment (Render)

### 1. Create Web Service
- [ ] Go to https://dashboard.render.com/
- [ ] Click "New +" → "Web Service"
- [ ] Connect GitHub repository
- [ ] Select your repository

### 2. Configure Service
```
Name: watch-store-backend
Region: Oregon (or closest)
Branch: main
Root Directory: Backend
Runtime: Node
Build Command: npm install && npm run build
Start Command: npm start
```

### 3. Add Environment Variables
Copy these to Render dashboard:

```env
NODE_ENV=production
PORT=10000
MONGODB_URI=mongodb+srv://tahirahmedkhan7_db_user:Q0VYXM3wwxoIrRdt@cluster0.ddxdp4q.mongodb.net/watch-store
JWT_SECRET=watch-store-super-secret-jwt-key-2024
JWT_EXPIRES_IN=7d
FRONTEND_URL=https://your-frontend.vercel.app
ADMIN_EMAIL=admin@watchstore.com
ADMIN_PASSWORD=admin123
SUPABASE_URL=https://hsrcbmqmtxnzxdwgenkm.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhzcmNibXFtdHhuenhkd2dlbmttIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA3OTEyMTksImV4cCI6MjA4NjM2NzIxOX0.wwLfvzS8XEacnuBj2NhnvQNkl_jWXsVfXqISChFmswg
SUPABASE_BUCKET_NAME=watch-website-images
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhzcmNibXFtdHhuenhkd2dlbmttIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MDc5MTIxOSwiZXhwIjoyMDg2MzY3MjE5fQ.i60t6aTNQRm0Y5tC2hEnxSPABGA4S_tXpZlwdmJY4YI
```

### 4. Deploy
- [ ] Click "Create Web Service"
- [ ] Wait for build to complete (5-10 minutes)
- [ ] Check logs for errors
- [ ] Note your backend URL: `https://watch-store-backend.onrender.com`

### 5. Test Backend
- [ ] Visit: `https://watch-store-backend.onrender.com/api/health`
- [ ] Should see: `{"success":true,"message":"API is running"}`

## 🎨 Frontend Deployment (Vercel)

### 1. Create Project
- [ ] Go to https://vercel.com/
- [ ] Click "Add New" → "Project"
- [ ] Import GitHub repository
- [ ] Select your repository

### 2. Configure Project
```
Framework Preset: Create React App
Root Directory: Frontend
Build Command: npm run build
Output Directory: build
Install Command: npm install
```

### 3. Add Environment Variable
```env
REACT_APP_API_URL=https://watch-store-backend.onrender.com/api
```

### 4. Deploy
- [ ] Click "Deploy"
- [ ] Wait for build to complete (3-5 minutes)
- [ ] Note your frontend URL: `https://your-app.vercel.app`

### 5. Test Frontend
- [ ] Visit your Vercel URL
- [ ] Check if homepage loads
- [ ] Check if products page loads
- [ ] Try admin login

## 🔄 Post-Deployment

### 1. Update Backend CORS
- [ ] Go to Render dashboard
- [ ] Open backend service
- [ ] Update `FRONTEND_URL` environment variable with your Vercel URL
- [ ] Click "Save Changes"
- [ ] Wait for redeploy

### 2. Seed Production Database (Optional)
- [ ] Go to Render dashboard
- [ ] Open backend service
- [ ] Click "Shell" tab
- [ ] Run: `npx ts-node src/scripts/seedAll.ts`
- [ ] Wait for completion

### 3. Test Everything
- [ ] Visit frontend URL
- [ ] Browse products
- [ ] Test admin login: `https://your-app.vercel.app/admin/login`
  - Email: admin@watchstore.com
  - Password: admin123
- [ ] Check admin dashboard loads
- [ ] Verify products show in admin panel
- [ ] Check orders show in admin panel

## 🐛 Troubleshooting

### Build Failed on Render
**Error**: "Missing script: build"
**Fix**: 
```bash
git add package.json
git commit -m "Add build script"
git push
```

### Backend Not Starting
**Check**:
- [ ] All environment variables set in Render
- [ ] MongoDB connection string is correct
- [ ] Check Render logs for errors

### Frontend Can't Connect to Backend
**Check**:
- [ ] `REACT_APP_API_URL` is set in Vercel
- [ ] Backend URL is correct (with `/api` at the end)
- [ ] Backend is running (check Render dashboard)
- [ ] CORS is configured (FRONTEND_URL in backend)

### Admin Login Not Working
**Fix**:
1. Go to Render Shell
2. Run: `npx ts-node src/scripts/resetAdminPassword.ts`
3. Try login again

## 📝 Important URLs

After deployment, save these:

```
Backend API: https://watch-store-backend.onrender.com/api
Frontend: https://your-app.vercel.app
Admin Login: https://your-app.vercel.app/admin/login
Health Check: https://watch-store-backend.onrender.com/api/health

Admin Credentials:
Email: admin@watchstore.com
Password: admin123
```

## 🎉 Success!

If all checkboxes are checked, your watch store is live!

- ✅ Backend deployed on Render
- ✅ Frontend deployed on Vercel
- ✅ MongoDB Atlas connected
- ✅ Admin login working
- ✅ Products loading
- ✅ Ready for customers!

---

**Next Steps**:
1. Share your frontend URL with users
2. Change admin password after first login
3. Add your own products
4. Monitor usage in Render/Vercel dashboards
5. Set up custom domain (optional)

**Free Tier Note**: Render free tier spins down after 15 minutes of inactivity. First request after spin-down takes 30-60 seconds to wake up.
