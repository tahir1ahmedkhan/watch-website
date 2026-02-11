# Get Correct Supabase Keys - Step by Step

## The Problem
Your keys are incomplete/truncated. Both keys should be VERY LONG (500+ characters each).

## Step-by-Step: Get Your Keys

### Step 1: Open Supabase Dashboard

1. Go to **https://supabase.com**
2. Click **Sign in**
3. Select your project: **hsrcbmqmtxnzxdwgenkm**

### Step 2: Navigate to API Settings

1. Click **Settings** (gear icon) in the left sidebar
2. Click **API** in the settings menu

### Step 3: Copy ANON Key

1. Scroll to **Project API keys** section
2. Find the key labeled **anon** or **public**
3. Click the **eye icon** (👁️) to reveal the full key
4. Click **Copy** button
5. The key should look like this (VERY LONG):
   ```
   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhzcmNibXFtdHhuenhkd2dlbmttIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA3OTEyMTksImV4cCI6MjA4NjM2NzIxOX0.LONG_STRING_HERE
   ```

### Step 4: Copy SERVICE_ROLE Key

1. Still in **Project API keys** section
2. Find the key labeled **service_role**
3. Click the **eye icon** (👁️) to reveal the full key
4. Click **Copy** button
5. The key should be EVEN LONGER than anon key
6. It looks similar but has "service_role" in it

### Step 5: Update .env File

Open `Backend/.env` and update it like this:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/watch-store

# JWT Secret
JWT_SECRET=watch-store-super-secret-jwt-key-2024
JWT_EXPIRES_IN=7d

# CORS
FRONTEND_URL=http://localhost:3000

# Supabase Configuration
SUPABASE_URL=https://hsrcbmqmtxnzxdwgenkm.supabase.co
SUPABASE_ANON_KEY=PASTE_FULL_ANON_KEY_HERE
SUPABASE_SERVICE_ROLE_KEY=PASTE_FULL_SERVICE_ROLE_KEY_HERE
SUPABASE_BUCKET_NAME=watch-website-images
```

**IMPORTANT:**
- Replace `PASTE_FULL_ANON_KEY_HERE` with the FULL anon key
- Replace `PASTE_FULL_SERVICE_ROLE_KEY_HERE` with the FULL service_role key
- Both keys should be 500+ characters long
- No spaces before or after the keys
- No quotes around the keys

### Step 6: Verify Keys Are Complete

Your keys should look like this format:

**ANON KEY:**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhzcmNibXFtdHhuenhkd2dlbmttIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA3OTEyMTksImV4cCI6MjA4NjM2NzIxOX0.XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

**SERVICE_ROLE KEY:**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhzcmNibXFtdHhuenhkd2dlbmttIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MDc5MTIxOSwiZXhwIjoyMDg2MzY3MjE5fQ.YYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY
```

Notice:
- Both start with `eyJ`
- Both have two dots (`.`)
- Anon key has `"role":"anon"`
- Service key has `"role":"service_role"`
- Both are VERY LONG

### Step 7: Save and Restart

1. Save the `.env` file
2. Stop backend server (Ctrl+C)
3. Restart:
   ```bash
   cd Backend
   npm run dev
   ```

You should see:
```
✅ Supabase configured successfully
📦 Using bucket: watch-website-images
```

### Step 8: Test Upload

Try uploading a product image - should work now!

---

## Common Mistakes

❌ **Key is too short** (like `LTouYYl10waWChA7`)
- This is truncated/incomplete
- Real keys are 500+ characters

❌ **Missing SERVICE_ROLE_KEY**
- You need BOTH keys
- Service role key is required for uploads

❌ **Extra spaces or quotes**
- Don't add quotes: ❌ `SUPABASE_ANON_KEY="key"`
- Correct format: ✅ `SUPABASE_ANON_KEY=key`

❌ **Didn't restart backend**
- Changes to `.env` require restart
- Stop server (Ctrl+C) and start again

---

## Screenshot Guide

When you're in Supabase Dashboard → Settings → API:

1. You'll see a section called **Project API keys**
2. Two keys are listed:
   - **anon / public** - For frontend
   - **service_role** - For backend (this one!)
3. Each key has an eye icon (👁️) - click it to reveal
4. Each key has a copy button - click it to copy
5. The keys are HIDDEN by default (shown as dots)

---

## Verification

After updating `.env`, check:

1. **File has both keys:**
   ```
   SUPABASE_ANON_KEY=eyJ... (very long)
   SUPABASE_SERVICE_ROLE_KEY=eyJ... (very long)
   ```

2. **Backend console shows:**
   ```
   ✅ Supabase configured successfully
   📦 Using bucket: watch-website-images
   ```

3. **Try upload:**
   - Should work without "Invalid Compact JWS" error

---

## Still Having Issues?

If you're still stuck, send me:
1. First 20 characters of your ANON_KEY
2. First 20 characters of your SERVICE_ROLE_KEY
3. Backend console output

I can verify if the keys are correct format!
