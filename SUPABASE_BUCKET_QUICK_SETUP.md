# Supabase Bucket Quick Setup for Product Image Upload

## Quick Overview
To upload local images from the admin product page, you need to configure a Supabase storage bucket. Here's the step-by-step process.

---

## Step 1: Create Supabase Account & Project

1. Go to **https://supabase.com**
2. Click **Start your project**
3. Sign up (free tier is sufficient)
4. Click **New Project**
5. Fill in:
   - **Name**: watch-store (or any name)
   - **Database Password**: Create a strong password
   - **Region**: Choose closest to you
6. Click **Create new project** (takes ~2 minutes)

---

## Step 2: Create Storage Bucket

1. In your Supabase dashboard, click **Storage** in the left sidebar
2. Click **New bucket** button
3. Configure bucket:
   - **Name**: `product-images` (must match exactly)
   - **Public bucket**: ✅ **Toggle ON** (important!)
   - **File size limit**: 5MB (default is fine)
   - **Allowed MIME types**: Leave empty (allows all image types)
4. Click **Create bucket**

---

## Step 3: Set Bucket Policies (Important!)

### Option A: Using the UI (Easier)

1. Click on your `product-images` bucket
2. Click **Policies** tab
3. Click **New Policy**
4. For each policy below, click **Get started quickly** → **Custom**

**Policy 1: Public Read Access**
- Name: `Public Access`
- Policy definition: `SELECT`
- Target roles: `public`
- Click **Review** → **Save policy**

**Policy 2: Authenticated Upload**
- Name: `Authenticated Upload`
- Policy definition: `INSERT`
- Target roles: `authenticated`
- Click **Review** → **Save policy**

**Policy 3: Authenticated Update**
- Name: `Authenticated Update`
- Policy definition: `UPDATE`
- Target roles: `authenticated`
- Click **Review** → **Save policy**

**Policy 4: Authenticated Delete**
- Name: `Authenticated Delete`
- Policy definition: `DELETE`
- Target roles: `authenticated`
- Click **Review** → **Save policy**

### Option B: Using SQL (Advanced)

1. Go to **SQL Editor** in left sidebar
2. Click **New query**
3. Paste and run this SQL:

```sql
-- Allow public read access
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'product-images' );

-- Allow authenticated users to upload
CREATE POLICY "Authenticated Upload"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK ( bucket_id = 'product-images' );

-- Allow authenticated users to update
CREATE POLICY "Authenticated Update"
ON storage.objects FOR UPDATE
TO authenticated
USING ( bucket_id = 'product-images' );

-- Allow authenticated users to delete
CREATE POLICY "Authenticated Delete"
ON storage.objects FOR DELETE
TO authenticated
USING ( bucket_id = 'product-images' );
```

4. Click **Run** (or press Ctrl+Enter)

---

## Step 4: Get Your Credentials

1. Go to **Settings** (gear icon in left sidebar)
2. Click **API** in the settings menu
3. You'll see:
   - **Project URL**: Copy this (looks like `https://xxxxx.supabase.co`)
   - **Project API keys** → **anon/public**: Copy this key (starts with `eyJ...`)

---

## Step 5: Configure Backend Environment

1. Open `Backend/.env` file in your project
2. Update these lines with your credentials:

```env
# Supabase Configuration
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_BUCKET_NAME=product-images
```

**Replace:**
- `https://your-project-id.supabase.co` with your actual Project URL
- `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` with your actual anon key
- Keep `product-images` as is (unless you named your bucket differently)

3. Save the file

---

## Step 6: Restart Backend Server

```bash
# Stop the current server (Ctrl+C)
cd Backend
npm run dev
```

You should see: `✅ Supabase configured successfully`

---

## Step 7: Test Image Upload

1. Open your frontend: `http://localhost:3000`
2. Login to admin dashboard
3. Go to **Products** tab
4. Click **Add Product** button
5. Fill in product details
6. Click **Choose File** and select an image
7. You should see image preview
8. Click **Create Product**
9. Image should upload to Supabase!

---

## Verification Checklist

✅ Supabase project created  
✅ Storage bucket `product-images` created  
✅ Bucket is set to **Public**  
✅ All 4 policies are created  
✅ Project URL copied to `.env`  
✅ Anon key copied to `.env`  
✅ Backend restarted  
✅ See "Supabase configured successfully" in backend logs  

---

## Troubleshooting

### Issue: "Supabase is not configured" error
**Solution:**
- Check `.env` file has correct `SUPABASE_URL` and `SUPABASE_ANON_KEY`
- Make sure there are no extra spaces
- Restart backend server

### Issue: Upload fails with "Policy violation"
**Solution:**
- Go to Supabase → Storage → product-images → Policies
- Verify all 4 policies are created
- Make sure bucket is set to **Public**

### Issue: Images upload but don't display
**Solution:**
- Bucket must be **Public** (not private)
- Check the image URL in your database
- Try opening the image URL directly in browser

### Issue: "Bucket not found" error
**Solution:**
- Verify bucket name is exactly `product-images`
- Check `SUPABASE_BUCKET_NAME` in `.env` matches bucket name
- Bucket names are case-sensitive

### Issue: File size too large
**Solution:**
- Default limit is 5MB
- Compress your image before uploading
- Or increase limit in `Backend/src/middleware/upload.ts`

---

## What Happens When You Upload?

1. You select an image in admin dashboard
2. Image is sent to backend as multipart/form-data
3. Backend receives file via Multer middleware
4. Backend uploads file to Supabase Storage
5. Supabase returns a public URL
6. Backend saves product with image URL to MongoDB
7. Image is now accessible via the public URL

---

## File Locations in Your Project

**Backend Configuration:**
- Environment variables: `Backend/.env`
- Supabase utility: `Backend/src/utils/supabase.ts`
- Upload middleware: `Backend/src/middleware/upload.ts`
- Product controller: `Backend/src/controllers/productController.ts`

**Frontend:**
- Products table: `Frontend/src/components/ProductsTable.jsx`
- Admin dashboard: `Frontend/src/pages/AdminDashboardWorking.jsx`

---

## Security Notes

✅ **Public bucket** = Anyone can view images (needed for product display)  
✅ **Authenticated upload** = Only logged-in admins can upload  
✅ **File type validation** = Only images allowed (JPEG, PNG, WebP, GIF)  
✅ **File size limit** = Maximum 5MB per image  
✅ **Automatic cleanup** = Old images deleted when product updated/removed  

---

## Alternative: Use Image URLs Instead

If you don't want to set up Supabase right now, you can:

1. Use external image URLs (Unsplash, Imgur, etc.)
2. In the product form, paste the image URL instead of uploading
3. The app will work the same way

Example URLs you can use:
```
https://images.unsplash.com/photo-1523275335684-37898b6baf30
https://images.unsplash.com/photo-1594534475808-b18fc33b045e
```

---

## Need Help?

If you're stuck:
1. Check backend console for error messages
2. Check Supabase dashboard → Storage → product-images for uploaded files
3. Verify all environment variables are set correctly
4. Make sure backend server restarted after changing `.env`

---

## Summary

**What you need:**
1. Supabase account (free)
2. Storage bucket named `product-images` (public)
3. 4 storage policies (read, insert, update, delete)
4. Project URL and anon key in `Backend/.env`
5. Restart backend server

**Time required:** ~10 minutes

**Result:** Upload local images from admin dashboard! 🎉
