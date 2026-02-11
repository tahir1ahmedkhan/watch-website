# Fix: Disable RLS on Supabase Bucket

## The Issue
Even with service_role key, if the bucket has RLS enabled but no policies, uploads will fail.

## Quick Fix: Disable RLS (Easiest Solution)

### Step 1: Go to Supabase Storage

1. Open https://supabase.com
2. Select your project
3. Click **Storage** in left sidebar
4. Click on **product-images** bucket

### Step 2: Disable RLS

1. Click **Policies** tab at the top
2. Look for **"Row Level Security (RLS)"** section
3. You'll see a toggle switch that says **"Enable RLS"**
4. **Turn it OFF** (toggle to the left/gray)
5. Confirm if prompted

### Step 3: Verify Bucket is Public

1. Still in the **product-images** bucket
2. Click **Configuration** tab
3. Make sure **"Public bucket"** is **ON** (toggle should be green/right)
4. If not, turn it ON

### Step 4: Restart Backend

```bash
cd Backend
npm run dev
```

### Step 5: Test Upload

Try uploading a product image - it should work now!

---

## What This Does

**With RLS Disabled:**
- ✅ Anyone can upload files (using service_role key)
- ✅ Anyone can read files (public bucket)
- ✅ Anyone can delete files (using service_role key)
- ⚠️ Less secure, but works for development

**Security Note:**
- This is fine for development/testing
- For production, you'd want RLS enabled with proper policies
- Since you're using service_role key in backend (not exposed), it's relatively safe

---

## Alternative: Check if Bucket Exists

If disabling RLS doesn't work, the bucket might not exist:

### Verify Bucket Exists

1. Go to **Storage** in Supabase
2. You should see **product-images** in the list
3. If not, create it:
   - Click **New bucket**
   - Name: `product-images`
   - Public: **ON**
   - Click **Create**

### Verify Bucket Name Matches

1. Check your `.env` file:
   ```env
   SUPABASE_BUCKET_NAME=product-images
   ```
2. Must match exactly (case-sensitive)
3. No spaces before or after

---

## Still Not Working? Try This

### Option 1: Create Bucket via SQL

1. Go to **SQL Editor**
2. Run this:

```sql
-- Create bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO NOTHING;
```

### Option 2: Check Supabase Logs

1. Go to **Logs** in left sidebar
2. Click **Storage**
3. Look for recent errors
4. Share the error message if you see one

### Option 3: Test with Supabase Dashboard

1. Go to **Storage** → **product-images**
2. Click **Upload file** button
3. Try uploading a test image manually
4. If this fails, the bucket has issues

---

## Complete Checklist

Run through this checklist:

- [ ] Bucket named `product-images` exists
- [ ] Bucket is set to **Public**
- [ ] RLS is **Disabled** (toggle OFF)
- [ ] `SUPABASE_URL` in `.env` is correct
- [ ] `SUPABASE_SERVICE_ROLE_KEY` in `.env` is correct (the long one)
- [ ] `SUPABASE_BUCKET_NAME=product-images` in `.env`
- [ ] Backend server restarted after changing `.env`
- [ ] Backend console shows "✅ Supabase configured successfully"

---

## Test Script

Create this file to test: `Backend/test-upload.js`

```javascript
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

async function testUpload() {
  console.log('Testing Supabase upload...');
  console.log('URL:', process.env.SUPABASE_URL);
  console.log('Bucket:', process.env.SUPABASE_BUCKET_NAME);
  
  try {
    const testContent = 'Hello from test!';
    const { data, error } = await supabase.storage
      .from('product-images')
      .upload('test/test.txt', testContent, {
        contentType: 'text/plain',
        upsert: true
      });

    if (error) {
      console.error('❌ Upload failed:', error);
      console.error('Error details:', JSON.stringify(error, null, 2));
    } else {
      console.log('✅ Upload successful!', data);
      
      // Get public URL
      const { data: urlData } = supabase.storage
        .from('product-images')
        .getPublicUrl('test/test.txt');
      
      console.log('📎 Public URL:', urlData.publicUrl);
      
      // Clean up
      await supabase.storage
        .from('product-images')
        .remove(['test/test.txt']);
      console.log('🧹 Cleaned up test file');
    }
  } catch (err) {
    console.error('❌ Error:', err);
  }
}

testUpload();
```

Run it:
```bash
cd Backend
node test-upload.js
```

This will show you the exact error!

---

## Summary

**Quick fix:**
1. Supabase → Storage → product-images → Policies
2. Turn OFF "Enable RLS"
3. Make sure bucket is Public
4. Restart backend
5. Try upload

**Should work now!** 🎉
