# Supabase Image Upload Setup Guide

## Overview
Your admin dashboard now supports uploading and managing product images using Supabase Storage. This guide will help you set up Supabase and configure your application.

## Features Added

### Backend
- ✅ Supabase client integration
- ✅ Image upload utility with automatic file naming
- ✅ Image deletion when products are updated/deleted
- ✅ Multer middleware for handling file uploads
- ✅ Admin endpoints for product CRUD operations with image upload

### Frontend
- ✅ Products Management tab in admin dashboard
- ✅ Beautiful product table with image previews
- ✅ Create/Edit product modal with image upload
- ✅ Image preview before upload
- ✅ Delete products with automatic image cleanup
- ✅ Search and pagination for products

## Supabase Setup Instructions

### Step 1: Create a Supabase Account
1. Go to [https://supabase.com](https://supabase.com)
2. Sign up for a free account
3. Create a new project

### Step 2: Create Storage Bucket
1. In your Supabase dashboard, go to **Storage**
2. Click **New Bucket**
3. Name it: `product-images`
4. Make it **Public** (so images can be accessed via URL)
5. Click **Create Bucket**

### Step 3: Set Bucket Policies
1. Click on the `product-images` bucket
2. Go to **Policies** tab
3. Add the following policies:

**Policy 1: Allow Public Read Access**
```sql
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'product-images' );
```

**Policy 2: Allow Authenticated Upload**
```sql
CREATE POLICY "Authenticated Upload"
ON storage.objects FOR INSERT
WITH CHECK ( bucket_id = 'product-images' );
```

**Policy 3: Allow Authenticated Update**
```sql
CREATE POLICY "Authenticated Update"
ON storage.objects FOR UPDATE
USING ( bucket_id = 'product-images' );
```

**Policy 4: Allow Authenticated Delete**
```sql
CREATE POLICY "Authenticated Delete"
ON storage.objects FOR DELETE
USING ( bucket_id = 'product-images' );
```

### Step 4: Get Your Credentials
1. Go to **Settings** → **API**
2. Copy the following:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon/public key** (starts with `eyJ...`)

### Step 5: Configure Backend Environment
1. Open `Backend/.env`
2. Update the Supabase configuration:

```env
# Supabase Configuration
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_BUCKET_NAME=product-images
```

### Step 6: Test the Setup
1. Start your backend server:
```bash
cd Backend
npm run dev
```

2. Start your frontend:
```bash
cd Frontend
npm start
```

3. Login to admin dashboard
4. Go to **Products** tab
5. Click **Add Product**
6. Fill in the form and upload an image
7. Click **Create Product**

## API Endpoints

### Admin Product Management

#### Get All Products (Admin)
```
GET /api/admin/products
Headers: Authorization: Bearer <admin-token>
Query Params:
  - page: number (default: 1)
  - limit: number (default: 20)
  - search: string
  - category: string
  - brand: string
  - inStock: boolean
```

#### Create Product
```
POST /api/admin/products
Headers: 
  - Authorization: Bearer <admin-token>
  - Content-Type: multipart/form-data
Body (FormData):
  - name: string (required)
  - price: number (required)
  - description: string (required)
  - brand: string (required)
  - category: string (required)
  - movement: string (required)
  - caseMaterial: string (required)
  - caseSize: string (required)
  - waterResistance: string (required)
  - warranty: string (required)
  - stockCount: number (required)
  - inStock: boolean
  - image: file (image file)
```

#### Update Product
```
PUT /api/admin/products/:id
Headers: 
  - Authorization: Bearer <admin-token>
  - Content-Type: multipart/form-data
Body (FormData): Same as Create Product
```

#### Delete Product
```
DELETE /api/admin/products/:id
Headers: Authorization: Bearer <admin-token>
```

## File Structure

### Backend Files Added/Modified
```
Backend/
├── src/
│   ├── controllers/
│   │   └── productController.ts (updated with admin endpoints)
│   ├── middleware/
│   │   └── upload.ts (new - multer configuration)
│   ├── routes/
│   │   └── admin.ts (updated with product routes)
│   └── utils/
│       └── supabase.ts (new - Supabase client & utilities)
├── .env (updated with Supabase config)
└── package.json (added @supabase/supabase-js, multer)
```

### Frontend Files Added/Modified
```
Frontend/
├── src/
│   ├── components/
│   │   └── ProductsTable.jsx (new - product management UI)
│   ├── pages/
│   │   └── AdminDashboardWorking.jsx (updated with Products tab)
│   └── styles/
│       └── admin.css (updated with product management styles)
└── package.json (added axios)
```

## Features in Admin Products Tab

### Product Table
- ✅ Display all products with images
- ✅ Show product name, brand, category, price, stock
- ✅ Status badges (In Stock / Out of Stock)
- ✅ Search functionality
- ✅ Pagination
- ✅ Edit and Delete actions

### Create/Edit Product Modal
- ✅ Image upload with preview
- ✅ All product fields (name, price, description, etc.)
- ✅ Category dropdown (Luxury, Sport, Casual, Dress, Smart)
- ✅ Stock management
- ✅ In Stock toggle
- ✅ Form validation
- ✅ Beautiful gradient design

### Image Handling
- ✅ Automatic upload to Supabase
- ✅ Unique file naming (timestamp + random string)
- ✅ Image preview before upload
- ✅ Old image deletion when updating
- ✅ Image deletion when product is deleted
- ✅ Supported formats: JPEG, PNG, WebP, GIF
- ✅ Max file size: 5MB

## Troubleshooting

### Images Not Uploading
1. Check Supabase credentials in `.env`
2. Verify bucket name is correct
3. Ensure bucket is public
4. Check storage policies are set correctly

### Images Not Displaying
1. Verify bucket is public
2. Check the image URL in the database
3. Ensure CORS is configured in Supabase

### Upload Fails with 413 Error
- File size exceeds 5MB limit
- Reduce image size or increase limit in `Backend/src/middleware/upload.ts`

### Authentication Errors
- Ensure admin token is valid
- Check if admin is logged in
- Verify adminAuth middleware is working

## Security Notes

1. **File Type Validation**: Only image files (JPEG, PNG, WebP, GIF) are allowed
2. **File Size Limit**: Maximum 5MB per image
3. **Authentication Required**: All product management endpoints require admin authentication
4. **Automatic Cleanup**: Old images are deleted when products are updated or removed

## Next Steps

### Optional Enhancements
1. **Multiple Images**: Allow multiple images per product
2. **Image Optimization**: Compress images before upload
3. **Image Cropping**: Add image cropping tool in the UI
4. **Bulk Upload**: Upload multiple products at once
5. **Image Gallery**: Show all product images in a gallery view

## Support

If you encounter any issues:
1. Check the browser console for errors
2. Check backend logs for error messages
3. Verify Supabase dashboard for storage activity
4. Ensure all environment variables are set correctly

## Summary

Your watch store now has a complete product management system with:
- ✅ Beautiful admin interface
- ✅ Image upload to Supabase
- ✅ Full CRUD operations
- ✅ Search and pagination
- ✅ Automatic image cleanup
- ✅ Responsive design

The admin can now easily add, edit, and delete products with images directly from the dashboard!
