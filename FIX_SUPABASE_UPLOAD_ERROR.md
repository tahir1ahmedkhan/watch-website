# Fix: Supabase Upload Error - Method Not Allowed

## Error
```
Supabase upload error: Method Not Allowed
```

## Root Cause
The storage bucket doesn't have the correct policies set, or the policies are configured incorrectly. Supabase is blocking the upload operation.

## Solution: Set Correct Storage Policies

### Method 1: Using Supabase SQL Editor (Recommended)

1. **Go to your Supabase Dashboard**
   - Open https://supabase.com
   - Select your project

2. **Open SQL Editor**
   - Click **SQL Editor** in the left sidebar
   - Click **New query**

3. **Run this SQL to fix policies:**

```sql
-- First, drop any existing policies (in case they're wrong)
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Upload" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Update" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Delete" ON storage.objects;
DROP POLICY IF EXISTS "Allow public read" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated uploads" ON storage.objects;

-- Create correct policies for product-images bucket
-- 1. Allow anyone to read/view images (public access)
CREATE POLICY "Public read access"
ON storage.objects FOR SELECT
USING (bucket_id = 'product-images');

-- 2. Allow anyone to upload (we'll use anon key from backend)
CREATE POLICY "Public upload access"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'product-images');

-- 3. Allow anyone to update
CREATE POLICY "Public update access"
ON storage.objects FOR UPDATE
USING (bucket_id = 'product-images');

-- 4. Allow anyone to delete
CREATE POLICY "Public delete access"
ON storage.objects FOR DELETE
USING (bucket_id = 'product-images');
```

4. **Click Run** (or press Ctrl+Enter)

5. **Verify policies were created:**
   - Go to **Storage** → **product-images** → **Policies**
   - You should see 4 policies listed

---

### Method 2: Using Supabase UI (Alternative)

If SQL doesn't work, try the UI:

1. **Go to Storage**
   - Click **Storage** in left sidebar
   - Click on **product-images** bucket

2. **Go to Policies tab**
   - Click **Policies** tab
   - Click **New Policy**

3. **Create Policy 1: Public Read**
   - Click **For full customization**
   - Policy name: `Public read access`
   - Allowed operation: `SELECT`
   - Policy definition:
     ```sql
     bucket_id = 'product-images'
     ```
   - Click **Review** → **Save policy**

4. **Create Policy 2: Public Insert**
   - Click **New Policy** → **For full customization**
   - Policy name: `Public upload access`
   - Allowed operation: `INSERT`
   - WITH CHECK expression:
     ```sql
     bucket_id = 'product-images'
     ```
   - Click **Review** → **Save policy**

5. **Create Policy 3: Public Update**
   - Click **New Policy** → **For full customization**
   - Policy name: `Public update access`
   - Allowed operation: `UPDATE`
   - USING expression:
     ```sql
     bucket_id = 'product-images'
     ```
   - Click **Review** → **Save policy**

6. **Create Policy 4: Public Delete**
   - Click **New Policy** → **For full customization**
   - Policy name: `Public delete access`
   - Allowed operation: `DELETE`
   - USING expression:
     ```sql
     bucket_id = 'product-images'
     ```
   - Click **Review** → **Save policy**

---

### Method 3: Disable RLS (Quick Fix - Less Secure)

If you just want to test quickly:

1. Go to **Storage** → **product-images**
2. Click **Policies** tab
3. Look for **"Enable RLS"** toggle at the top
4. **Turn it OFF** (disable Row Level Security)

⚠️ **Warning:** This makes the bucket completely public. Anyone can upload/delete. Only use for testing!

---

## Verify the Fix

### Test 1: Check Policies
1. Go to Supabase Dashboard
2. Storage → product-images → Policies
3. You should see 4 policies:
   - Public read access (SELECT)
   - Public upload access (INSERT)
   - Public update access (UPDATE)
   - Public delete access (DELETE)

### Test 2: Test Upload
1. Restart your backend server:
   ```bash
   cd Backend
   npm run dev
   ```

2. Try uploading a product image from admin dashboard

3. Check backend console - should see success message

### Test 3: Check Supabase Storage
1. Go to Storage → product-images
2. You should see a `products/` folder
3. Your uploaded image should be inside

---

## Alternative: Use Service Role Key (More Secure)

If you want better security, use the service role key instead of anon key:

1. **Get Service Role Key:**
   - Supabase Dashboard → Settings → API
   - Copy **service_role** key (NOT anon key)
   - ⚠️ Keep this secret! Don't expose to frontend

2. **Update Backend .env:**
   ```env
   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_ANON_KEY=your-service-role-key-here
   SUPABASE_BUCKET_NAME=product-images
   ```

3. **Update policies to require authentication:**
   ```sql
   -- Drop public policies
   DROP POLICY IF EXISTS "Public upload access" ON storage.objects;
   DROP POLICY IF EXISTS "Public update access" ON storage.objects;
   DROP POLICY IF EXISTS "Public delete access" ON storage.objects;

   -- Create authenticated policies
   CREATE POLICY "Authenticated upload"
   ON storage.objects FOR INSERT
   TO authenticated
   WITH CHECK (bucket_id = 'product-images');

   CREATE POLICY "Authenticated update"
   ON storage.objects FOR UPDATE
   TO authenticated
   USING (bucket_id = 'product-images');

   CREATE POLICY "Authenticated delete"
   ON storage.objects FOR DELETE
   TO authenticated
   USING (bucket_id = 'product-images');
   ```

4. **Restart backend**

---

## Common Issues

### Issue: Still getting "Method Not Allowed"
**Solutions:**
1. Make sure bucket name is exactly `product-images`
2. Verify policies are for the correct bucket
3. Try disabling RLS temporarily to test
4. Check Supabase logs: Dashboard → Logs → Storage

### Issue: "Bucket not found"
**Solutions:**
1. Verify bucket exists: Storage → should see `product-images`
2. Check bucket name in `.env` matches exactly
3. Bucket names are case-sensitive

### Issue: "Invalid API key"
**Solutions:**
1. Copy anon key again from Settings → API
2. Make sure no extra spaces in `.env`
3. Restart backend after changing `.env`

### Issue: Policies not saving
**Solutions:**
1. Use SQL Editor instead of UI
2. Make sure you're the project owner
3. Try refreshing the page

---

## Quick Test Script

Run this in your backend to test Supabase connection:

```javascript
// test-supabase.js
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

async function testUpload() {
  try {
    // Test upload
    const { data, error } = await supabase.storage
      .from('product-images')
      .upload('test/test.txt', 'Hello World', {
        contentType: 'text/plain'
      });

    if (error) {
      console.error('❌ Upload failed:', error.message);
    } else {
      console.log('✅ Upload successful!');
      
      // Clean up test file
      await supabase.storage
        .from('product-images')
        .remove(['test/test.txt']);
    }
  } catch (err) {
    console.error('❌ Error:', err.message);
  }
}

testUpload();
```

Run it:
```bash
cd Backend
node test-supabase.js
```

---

## Summary

**The fix:**
1. Go to Supabase SQL Editor
2. Run the SQL to create proper policies
3. Restart backend server
4. Try uploading again

**Expected result:**
- Upload should work
- Image appears in Supabase Storage
- Product created with image URL

**If still not working:**
- Temporarily disable RLS to test
- Use service role key instead of anon key
- Check Supabase logs for detailed errors
