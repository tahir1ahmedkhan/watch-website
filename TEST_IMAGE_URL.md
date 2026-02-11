# Test If Image URL Works

## Quick Test

1. **Open your MongoDB database** (MongoDB Compass or similar)
2. **Find a product** that has an image
3. **Copy the image URL** from the `image` field
4. **Paste it in your browser** address bar
5. **Press Enter**

**Expected Result:**
- ✅ Image displays = Bucket is public, frontend issue
- ❌ Error/blank page = Bucket is NOT public

---

## If Image Doesn't Display in Browser

The bucket is NOT public. Fix it:

### Method 1: Via Supabase UI

1. Go to https://supabase.com
2. Storage → **watch-website-images**
3. Click **Configuration** tab (NOT S3 Configuration)
4. Toggle **"Public bucket"** to ON
5. Click **Save**

### Method 2: Via SQL

1. Go to **SQL Editor**
2. Run this:

```sql
-- Make bucket public
UPDATE storage.buckets 
SET public = true 
WHERE id = 'watch-website-images';
```

3. Click **Run**

---

## If Image DOES Display in Browser

Then the issue is in your frontend. Check:

### 1. Check Browser Console

1. Open your admin dashboard
2. Press **F12** to open DevTools
3. Go to **Console** tab
4. Look for errors related to images

### 2. Check Network Tab

1. Press **F12** → **Network** tab
2. Reload the page
3. Look for image requests (filter by "Img")
4. Click on any failed image request
5. Check the error

### 3. Check Image URL Format

The URL should look like:
```
https://hsrcbmqmtxnzxdwgenkm.supabase.co/storage/v1/object/public/watch-website-images/products/1234567890-abc123.jpg
```

If it looks different, there might be an issue with how the URL is generated.

---

## Common Issues

### Issue: Image URL is missing "public" in path
**Wrong:** `https://...supabase.co/storage/v1/object/watch-website-images/...`
**Correct:** `https://...supabase.co/storage/v1/object/public/watch-website-images/...`

**Fix:** Bucket needs to be public

### Issue: 403 Forbidden
**Cause:** Bucket is private
**Fix:** Make bucket public (see above)

### Issue: 404 Not Found
**Cause:** File doesn't exist or wrong path
**Fix:** Check Supabase Storage to verify file exists

### Issue: CORS Error
**Cause:** CORS not configured
**Fix:** Add CORS policy (see below)

---

## Add CORS Policy (If Needed)

If images work in browser but not in your app:

1. Go to **SQL Editor**
2. Run this:

```sql
-- Add CORS policy for storage
INSERT INTO storage.cors (bucket_id, allowed_origins, allowed_methods, allowed_headers, max_age)
VALUES (
  'watch-website-images',
  ARRAY['http://localhost:3000', 'http://localhost:5000'],
  ARRAY['GET', 'HEAD', 'PUT', 'POST', 'DELETE'],
  ARRAY['*'],
  3600
)
ON CONFLICT (bucket_id) 
DO UPDATE SET
  allowed_origins = ARRAY['http://localhost:3000', 'http://localhost:5000'],
  allowed_methods = ARRAY['GET', 'HEAD', 'PUT', 'POST', 'DELETE'],
  allowed_headers = ARRAY['*'],
  max_age = 3600;
```

---

## Debug: Add Console Logs

Add this to `ProductsTable.jsx` to see what's happening:

```javascript
// Around line 295, before the <img> tag
console.log('Product image URL:', product.image);
```

Then check browser console to see the actual URL being used.

---

## Summary

**Step 1:** Test image URL in browser
- If works → Frontend/CORS issue
- If doesn't work → Bucket not public

**Step 2:** Make bucket public
- Supabase → Storage → Configuration → Public bucket ON

**Step 3:** Refresh frontend
- Images should appear!

**Step 4:** If still not working
- Check browser console for errors
- Add CORS policy
- Verify image URLs are correct format
