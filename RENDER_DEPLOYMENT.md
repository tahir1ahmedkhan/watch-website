# 🚀 Render Deployment Guide

## Backend Deployment (API Server)

### Step 1: Create Web Service on Render

1. Go to https://dashboard.render.com/
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure the service:

### Step 2: Service Configuration

```yaml
Name: watch-store-backend
Region: Choose closest to you
Branch: main
Root Directory: Backend
Runtime: Node
Build Command: npm install && npm run build
Start Command: npm start
```

### Step 3: Environment Variables

Add these in Render dashboard under "Environment":

```env
NODE_ENV=production
PORT=10000
MONGODB_URI=mongodb+srv://tahirahmedkhan7_db_user:Q0VYXM3wwxoIrRdt@cluster0.ddxdp4q.mongodb.net/watch-store
JWT_SECRET=watch-store-super-secret-jwt-key-2024
JWT_EXPIRES_IN=7d
FRONTEND_URL=https://your-frontend-url.vercel.app
ADMIN_EMAIL=admin@watchstore.com
ADMIN_PASSWORD=admin123
SUPABASE_URL=https://hsrcbmqmtxnzxdwgenkm.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhzcmNibXFtdHhuenhkd2dlbmttIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA3OTEyMTksImV4cCI6MjA4NjM2NzIxOX0.wwLfvzS8XEacnuBj2NhnvQNkl_jWXsVfXqISChFmswg
SUPABASE_BUCKET_NAME=watch-website-images
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhzcmNibXFtdHhuenhkd2dlbmttIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MDc5MTIxOSwiZXhwIjoyMDg2MzY3MjE5fQ.i60t6aTNQRm0Y5tC2hEnxSPABGA4S_tXpZlwdmJY4YI
```

### Step 4: Deploy

Click "Create Web Service" and wait for deployment to complete.

Your backend will be available at: `https://watch-store-backend.onrender.com`

---

## Frontend Deployment (Vercel)

### Step 1: Deploy to Vercel

1. Go to https://vercel.com/
2. Click "Add New" → "Project"
3. Import your GitHub repository
4. Configure:

```yaml
Framework Preset: Create React App
Root Directory: Frontend
Build Command: npm run build
Output Directory: build
Install Command: npm install
```

### Step 2: Environment Variables

Add in Vercel dashboard:

```env
REACT_APP_API_URL=https://watch-store-backend.onrender.com/api
```

### Step 3: Deploy

Click "Deploy" and wait for completion.

Your frontend will be available at: `https://your-app.vercel.app`

---

## Post-Deployment Steps

### 1. Update CORS in Backend

After deploying frontend, update the `FRONTEND_URL` environment variable in Render:

```env
FRONTEND_URL=https://your-app.vercel.app
```

Then redeploy the backend.

### 2. Seed Database (Optional)

If you want to populate the production database:

1. Go to Render dashboard
2. Open your backend service
3. Go to "Shell" tab
4. Run:
```bash
npx ts-node src/scripts/seedAll.ts
```

### 3. Test Admin Login

1. Go to: `https://your-app.vercel.app/admin/login`
2. Login with:
   - Email: admin@watchstore.com
   - Password: admin123

---

## Render Configuration Files

### render.yaml (Optional - for Blueprint)

Create `render.yaml` in root directory:

```yaml
services:
  - type: web
    name: watch-store-backend
    env: node
    region: oregon
    plan: free
    buildCommand: cd Backend && npm install && npm run build
    startCommand: cd Backend && npm start
    envVars:
      - key: NODE_ENV
        value: production
      - key: MONGODB_URI
        sync: false
      - key: JWT_SECRET
        generateValue: true
      - key: FRONTEND_URL
        sync: false
```

---

## Troubleshooting

### Build Failed: Missing Script "build"

**Solution**: The root package.json now has a "build" script. Make sure you've committed the changes:

```bash
git add package.json
git commit -m "Add build script for Render deployment"
git push
```

### Backend Not Starting

**Check Logs** in Render dashboard:
- Look for MongoDB connection errors
- Verify all environment variables are set
- Check if port is correctly set to 10000

### Frontend Can't Connect to Backend

1. Verify `REACT_APP_API_URL` in Vercel environment variables
2. Check CORS settings in backend
3. Ensure backend is running (check Render dashboard)

### MongoDB Connection Failed

1. Verify MongoDB Atlas connection string
2. Check if IP whitelist includes `0.0.0.0/0` (allow all) in MongoDB Atlas
3. Test connection string locally first

---

## Free Tier Limitations

### Render Free Tier
- ⚠️ Service spins down after 15 minutes of inactivity
- ⚠️ First request after spin-down takes 30-60 seconds
- ✅ 750 hours/month free
- ✅ Automatic HTTPS

### Vercel Free Tier
- ✅ Unlimited deployments
- ✅ Automatic HTTPS
- ✅ Global CDN
- ⚠️ 100GB bandwidth/month

### MongoDB Atlas Free Tier
- ✅ 512MB storage
- ✅ Shared cluster
- ⚠️ Limited to 3 clusters

---

## Alternative: Deploy Both on Render

If you want to deploy frontend on Render too:

### Frontend as Static Site

1. Create "Static Site" on Render
2. Configure:
```yaml
Build Command: cd Frontend && npm install && npm run build
Publish Directory: Frontend/build
```

3. Add environment variable:
```env
REACT_APP_API_URL=https://watch-store-backend.onrender.com/api
```

---

## Deployment Checklist

### Before Deployment
- [ ] All code committed to GitHub
- [ ] Environment variables documented
- [ ] MongoDB Atlas IP whitelist configured
- [ ] Build scripts working locally
- [ ] Admin credentials set

### Backend Deployment
- [ ] Render web service created
- [ ] Environment variables added
- [ ] Build successful
- [ ] Service running
- [ ] Health check endpoint working

### Frontend Deployment
- [ ] Vercel project created
- [ ] API URL environment variable set
- [ ] Build successful
- [ ] Site accessible
- [ ] Can connect to backend

### Post-Deployment
- [ ] Admin login working
- [ ] Products loading
- [ ] Orders working
- [ ] Images loading (Supabase)
- [ ] CORS configured correctly

---

## Quick Deploy Commands

### Update Backend
```bash
git add .
git commit -m "Update backend"
git push
# Render auto-deploys
```

### Update Frontend
```bash
git add .
git commit -m "Update frontend"
git push
# Vercel auto-deploys
```

### Manual Redeploy
- **Render**: Dashboard → Service → "Manual Deploy" → "Deploy latest commit"
- **Vercel**: Dashboard → Project → "Deployments" → "Redeploy"

---

## Production URLs

After deployment, update these in your documentation:

- **Backend API**: `https://watch-store-backend.onrender.com/api`
- **Frontend**: `https://your-app.vercel.app`
- **Admin Login**: `https://your-app.vercel.app/admin/login`
- **Health Check**: `https://watch-store-backend.onrender.com/api/health`

---

## Security Recommendations

1. **Change default admin password** after first login
2. **Use strong JWT secret** (generate with: `openssl rand -base64 32`)
3. **Enable MongoDB Atlas IP whitelist** (add Render IPs)
4. **Use environment variables** for all secrets
5. **Enable HTTPS only** (automatic on Render/Vercel)
6. **Set up monitoring** (Render has built-in monitoring)

---

**Last Updated**: February 2026  
**Deployment Platform**: Render (Backend) + Vercel (Frontend)  
**Database**: MongoDB Atlas
