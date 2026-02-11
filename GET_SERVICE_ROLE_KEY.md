# Get Supabase Service Role Key - Fix "Method Not Allowed"

## The Problem
The **anon key** has restrictions and can't upload files. You need the **service_role key** for backend operations.

## Quick Fix (2 minutes)

### Step 1: Get Your Service Role Key

1. **Go to Supabase Dashboard**
   - Open https://supabase.com
   - Select your project

2. **Navigate to API Settings**
   - Click **Settings** (gear icon) in left sidebar
   - Click **API**

3. **Find Service Role Key**
   - Scroll down to **Project API keys**
   - You'll see two keys:
     - ✅ **anon** / **public** - For frontend (limited permissions)
     - ✅ **service_role** - For backend (full permissions)
   
4. **Copy the service_role key**
   - Click the **eye icon** next to **service_role** to reveal it
   - Click **Copy** button
   - It starts with `eyJ...` (much longer than anon key)

### Step 2: Update Your .env File

1. **Open `Backend/.env`**

2. **Add the service_role key:**

```env
# Supabase Configuration
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here-PASTE-IT-HERE
SUPABASE_BUCKET_NAME=product-images
```

**Important:**
- Keep both keys (anon and service_role)
- The service_role key is MUCH longer
- No spaces before or after the key
- Don't share the service_role key publicly!

### Step 3: Restart Backend

```bash
# Stop current server (Ctrl+C)
cd Backend
npm run dev
```

You should see:
```
✅ Supabase configured successfully
📦 Using bucket: product-images
```

### Step 4: Test Upload

1. Go to admin dashboard
2. Products tab → Add Product
3. Upload an image
4. Should work now! ✅

---

## Why This Works

**Anon Key (Frontend):**
- Limited permissions
- Respects Row Level Security (RLS) policies
- Can't bypass restrictions
- ❌ Can't upload without proper policies

**Service Role Key (Backend):**
- Full admin permissions
- Bypasses RLS policies
- Can do anything
- ✅ Can upload without restrictions

---

## Security Note

⚠️ **NEVER expose service_role key to frontend!**

- ✅ Use in backend `.env` file (safe)
- ✅ Use in server-side code (safe)
- ❌ Don't put in frontend code (dangerous!)
- ❌ Don't commit to GitHub (use .gitignore)

The `.env` file is already in `.gitignore`, so you're safe!

---

## Verification

After updating and restarting:

1. **Check backend console:**
   ```
   ✅ Supabase configured successfully
   📦 Using bucket: product-images
   ```

2. **Try uploading:**
   - Should work without "Method Not Allowed" error

3. **Check Supabase Storage:**
   - Go to Storage → product-images
   - Should see uploaded images in `products/` folder

---

## Still Not Working?

### Issue: "Invalid API key"
**Solution:**
- Make sure you copied the **service_role** key (not anon)
- Check for extra spaces in `.env`
- Key should be very long (500+ characters)

### Issue: "Bucket not found"
**Solution:**
- Verify bucket name is exactly `product-images`
- Check it exists: Supabase → Storage
- Bucket names are case-sensitive

### Issue: Still "Method Not Allowed"
**Solution:**
- Make sure you're using `SUPABASE_SERVICE_ROLE_KEY` (not ANON_KEY)
- Restart backend after changing `.env`
- Check backend console for "Supabase configured successfully"

---

## Example .env File

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/watch-store

# JWT Secret
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=7d

# CORS
FRONTEND_URL=http://localhost:3000

# Supabase Configuration
SUPABASE_URL=https://abcdefghijklmnop.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTYzMDAwMDAwMCwiZXhwIjoxOTQ1NTc2MDAwfQ.short-key-here
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoic2VydmljZV9yb2xlIiwiaWF0IjoxNjMwMDAwMDAwLCJleHAiOjE5NDU1NzYwMDB9.very-long-key-here-much-longer-than-anon-key
SUPABASE_BUCKET_NAME=product-images
```

---

## Summary

**What you need:**
1. Go to Supabase → Settings → API
2. Copy **service_role** key (the longer one)
3. Add to `Backend/.env` as `SUPABASE_SERVICE_ROLE_KEY`
4. Restart backend
5. Upload should work! 🎉

**Time:** 2 minutes
**Result:** Image uploads work perfectly!
