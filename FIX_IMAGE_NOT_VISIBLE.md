# Fix: Images Upload But Not Visible

## The Problem
Images upload successfully to Supabase but don't display on the frontend.

## Quick Fix (2 minutes)

### Step 1: Make Bucket Public

1. **Go to Supabase Dashboard**
   - https://supabase.com
   - Open your project

2. **Go to Storage**
   - Click **Storage** in left sidebar
   - Click on **watch-website-images** bucket

3. **Make it Public**
   - Click **Configuration** tab
   - Find **"Public bucket"** toggle
   - Turn it **ON** (should be green/right)
   - Click **Save** if prompted

### Step 2: Verify Image URL

1. **Check Supabase Storage**
   - Storage → watch-website-images
   - You should see a `products/` folder
   - Click on it to see your uploaded images

2. **Test Image URL**
   - Click on any image
   - Click **Get URL** or **Copy URL**
   - Paste URL in browser address bar
   - Image should display

If image displays in browser, the issue is in your frontend code.

### Step 3: Check CORS Settings

1. **Go to Storage Settings**
   - Storage → watch-website-images → Configuration

2. **Add CORS Policy**
   - Scroll to **CORS configuration**
   - Add this configuration:

```json
[
  {
    "allowedOrigins": ["*"],
    "allowedMethods": ["GET", "HEAD"],
    "allowedHeaders": ["*"],
    "maxAge": 3600
  }
]
```

Or via SQL:

1. Go to **SQL Editor**
2. Run this:

```sql
-- Allow CORS for storage
INSERT INTO storage.cors (bucket_id, allowed_origins, allowed_methods, allowed_headers, max_age)
VALUES (
  'watch-website-images',
  ARRAY['*'],
  ARRAY['GET', 'HEAD'],
  ARRAY['*'],
  3600
)
ON CONFLICT (bucket_id) DO UPDATE
SET allowed_origins = ARRAY['*'],
    allowed_methods = ARRAY['GET', 'HEAD'],
    allowed_headers = ARRAY['*'],
    max_age = 3600;
```

---

## Alternative: Check Frontend Code

If bucket is public and CORS is set, check your frontend:

### Check Image URL Format

The image URL should look like:
```
https://hsrcbmqmtxnzxdwgenkm.supabase.co/storage/v1/object/public/watch-website-images/products/filename.jpg
```

### Check Browser Console

1. Open browser DevTools (F12)
2. Go to **Console** tab
3. Look for errors like:
   - "Failed to load resource"
   - "CORS policy"
   - "403 Forbidden"
   - "404 Not Found"

### Check Network Tab

1. Open browser DevTools (F12)
2. Go to **Network** tab
3. Reload page
4. Look for image requests
5. Click on failed image request
6. Check the response

---

## Test Image URL Manually

1. **Get an image URL from your database:**
   - Open MongoDB Compass or use mongo shell
   - Find a product with an image
   - Copy the image URL

2. **Test in browser:**
   - Paste URL in browser address bar
   - Press Enter
   - Image should display

3. **If image doesn't display:**
   - Check if URL is correct format
   - Check if bucket is public
   - Check if file exists in Supabase Storage

---

## Common Issues

### Issue: 403 Forbidden
**Solution:**
- Bucket is not public
- Go to Storage → Configuration → Turn ON "Public bucket"

### Issue: 404 Not Found
**Solution:**
- File doesn't exist in Supabase
- Check Storage → watch-website-images → products/
- Verify filename matches URL

### Issue: CORS Error
**Solution:**
- Add CORS policy (see Step 3 above)
- Make sure allowed origins includes your frontend URL

### Issue: Image URL is wrong format
**Solution:**
- Should be: `https://PROJECT.supabase.co/storage/v1/object/public/BUCKET/path/file.jpg`
- Check the URL returned by backend

---

## Verify Everything

Run through this checklist:

- [ ] Bucket **watch-website-images** exists
- [ ] Bucket is set to **Public** (Configuration tab)
- [ ] CORS policy is set (allows GET requests)
- [ ] Image file exists in Storage (check manually)
- [ ] Image URL works when pasted in browser
- [ ] Frontend is using correct image URL
- [ ] No CORS errors in browser console

---

## Debug: Check What URL is Being Used

Add this to your frontend to see the image URL:

In `ProductsTable.jsx` or wherever images are displayed:

```javascript
console.log('Image URL:', product.image);
```

Then check browser console to see what URL is being used.

---

## Quick Test

1. **Upload a product with image**
2. **Check backend response** - should include image URL
3. **Copy that URL**
4. **Paste in browser** - image should display
5. **If yes:** Frontend issue
6. **If no:** Supabase configuration issue

---

## Summary

**Most likely fix:**
1. Supabase → Storage → watch-website-images → Configuration
2. Turn ON "Public bucket"
3. Save
4. Refresh your frontend
5. Images should appear! 🎉

**If still not working:**
- Check browser console for errors
- Test image URL directly in browser
- Verify CORS settings
