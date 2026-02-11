# Quick Start Checklist - Product Image Upload

## ✅ Setup Checklist

Follow these steps to get the product image upload feature working:

### 1. Supabase Account Setup
- [ ] Go to [https://supabase.com](https://supabase.com)
- [ ] Create a free account (if you don't have one)
- [ ] Create a new project
- [ ] Wait for project to be ready (~2 minutes)

### 2. Create Storage Bucket
- [ ] In Supabase dashboard, click **Storage** in sidebar
- [ ] Click **New Bucket** button
- [ ] Enter bucket name: `product-images`
- [ ] Select **Public bucket** option
- [ ] Click **Create Bucket**

### 3. Set Storage Policies
- [ ] Click on `product-images` bucket
- [ ] Go to **Policies** tab
- [ ] Click **New Policy**
- [ ] Add these 4 policies:

**Policy 1: Public Read**
```sql
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'product-images' );
```

**Policy 2: Authenticated Upload**
```sql
CREATE POLICY "Authenticated Upload"
ON storage.objects FOR INSERT
WITH CHECK ( bucket_id = 'product-images' );
```

**Policy 3: Authenticated Update**
```sql
CREATE POLICY "Authenticated Update"
ON storage.objects FOR UPDATE
USING ( bucket_id = 'product-images' );
```

**Policy 4: Authenticated Delete**
```sql
CREATE POLICY "Authenticated Delete"
ON storage.objects FOR DELETE
USING ( bucket_id = 'product-images' );
```

### 4. Get Supabase Credentials
- [ ] In Supabase dashboard, go to **Settings** → **API**
- [ ] Copy **Project URL** (e.g., `https://xxxxx.supabase.co`)
- [ ] Copy **anon/public key** (starts with `eyJ...`)

### 5. Configure Backend
- [ ] Open `Backend/.env` file
- [ ] Find the Supabase section at the bottom
- [ ] Replace `your-supabase-project-url` with your Project URL
- [ ] Replace `your-supabase-anon-key` with your anon key
- [ ] Save the file

Example:
```env
SUPABASE_URL=https://abcdefghijk.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_BUCKET_NAME=product-images
```

### 6. Start Backend Server
- [ ] Open terminal in project root
- [ ] Navigate to Backend: `cd Backend`
- [ ] Start server: `npm run dev`
- [ ] Verify no errors in console
- [ ] Server should be running on `http://localhost:5000`

### 7. Start Frontend
- [ ] Open new terminal in project root
- [ ] Navigate to Frontend: `cd Frontend`
- [ ] Start app: `npm start`
- [ ] Browser should open automatically
- [ ] App should load at `http://localhost:3000`

### 8. Test Product Upload
- [ ] Go to `http://localhost:3000/admin/login`
- [ ] Login with admin credentials
- [ ] Click **Products** tab in sidebar
- [ ] Click **Add Product** button
- [ ] Fill in all required fields
- [ ] Click **Upload Image** and select an image
- [ ] Verify image preview appears
- [ ] Click **Create Product**
- [ ] Verify success message
- [ ] Check product appears in table with image

### 9. Verify Image in Supabase
- [ ] Go back to Supabase dashboard
- [ ] Click **Storage** → `product-images`
- [ ] Click **products** folder
- [ ] Verify your uploaded image is there
- [ ] Click on image to see public URL

### 10. Test Other Features
- [ ] **Edit Product**: Click edit button, change details, upload new image
- [ ] **Search**: Type in search box to find products
- [ ] **Pagination**: Navigate between pages if you have 10+ products
- [ ] **Delete Product**: Click delete button, confirm deletion
- [ ] **Verify Cleanup**: Check Supabase storage - deleted image should be gone

## 🎯 Quick Test Checklist

After setup, verify these work:

- [ ] ✅ Create product with image
- [ ] ✅ Image appears in product table
- [ ] ✅ Edit product and change image
- [ ] ✅ Old image deleted from Supabase
- [ ] ✅ New image uploaded to Supabase
- [ ] ✅ Search products by name
- [ ] ✅ Delete product
- [ ] ✅ Image deleted from Supabase
- [ ] ✅ Pagination works (if 10+ products)

## 🚨 Troubleshooting

### Backend won't start
- Check if MongoDB is running
- Verify `.env` file has all required variables
- Check for port conflicts (port 5000)

### Frontend won't start
- Check if backend is running first
- Verify `REACT_APP_API_URL` in Frontend/.env
- Check for port conflicts (port 3000)

### Image upload fails
- Verify Supabase credentials in Backend/.env
- Check bucket name is exactly `product-images`
- Ensure bucket is public
- Verify storage policies are set

### Image doesn't display
- Check browser console for errors
- Verify image URL in database
- Ensure bucket is public
- Check CORS settings in Supabase

### "Unauthorized" error
- Verify admin is logged in
- Check admin token in localStorage
- Try logging out and back in

## 📞 Need Help?

If something doesn't work:

1. **Check Documentation**:
   - `SUPABASE_SETUP_GUIDE.md` - Detailed Supabase setup
   - `ADMIN_PRODUCTS_GUIDE.md` - How to use the interface
   - `PRODUCT_IMAGE_UPLOAD_SUMMARY.md` - Technical details

2. **Check Console**:
   - Browser console (F12) for frontend errors
   - Terminal for backend errors

3. **Verify Setup**:
   - Supabase project is active
   - Bucket exists and is public
   - Policies are set correctly
   - Environment variables are correct

4. **Common Issues**:
   - Wrong Supabase URL or key
   - Bucket not public
   - Missing storage policies
   - Admin not logged in

## 🎉 Success!

When everything works, you should be able to:
- ✅ Login to admin dashboard
- ✅ See Products tab
- ✅ Create products with images
- ✅ Edit products and change images
- ✅ Delete products
- ✅ Search and filter products
- ✅ See images in Supabase storage

## 📚 Next Steps

After successful setup:

1. **Add Real Products**: Start adding your watch inventory
2. **Organize Categories**: Use consistent category names
3. **Quality Images**: Upload high-quality product photos
4. **Test Thoroughly**: Try all features before going live
5. **Backup Data**: Export product data regularly

## 🔐 Security Reminder

- Keep your Supabase keys secure
- Don't commit `.env` file to git
- Use strong admin passwords
- Regularly update dependencies

---

**Estimated Setup Time**: 15-20 minutes

**Difficulty**: Easy to Medium

**Prerequisites**: 
- Node.js installed
- MongoDB running
- Admin account created
- Internet connection

Good luck! 🚀
