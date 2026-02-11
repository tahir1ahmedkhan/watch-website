# Testing Product Management Without Supabase

## Quick Start (No Supabase Required!)

You can now test the product management system **without setting up Supabase** by using image URLs instead of uploading files.

## How to Test

### 1. Start Backend
```bash
cd Backend
npm run dev
```

### 2. Start Frontend
```bash
cd Frontend
npm start
```

### 3. Login to Admin Dashboard
- Go to `http://localhost:3000/admin/login`
- Login with your admin credentials

### 4. Navigate to Products Tab
- Click on **Products** tab in the sidebar (watch icon)

### 5. Create a Product (Using Image URL)

Click **Add Product** button and fill in the form:

**Required Fields:**
- **Product Name**: Rolex Submariner
- **Price**: 12999
- **Brand**: Rolex
- **Category**: Luxury (select from dropdown)
- **Movement**: Automatic
- **Case Material**: Stainless Steel
- **Case Size**: 41mm
- **Water Resistance**: 300m
- **Warranty**: 5 Years
- **Stock Count**: 10
- **Description**: Iconic diving watch with exceptional craftsmanship
- **In Stock**: ✓ (checked)

**For Image (Choose ONE option):**

**Option 1: Use Image URL** (No Supabase needed)
- In the "Image URL" field, paste any watch image URL, for example:
  ```
  https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800
  ```

**Option 2: Upload File** (Requires Supabase)
- Click "Upload Image" button
- Select an image file from your computer
- (This will only work if Supabase is configured)

### 6. Click "Create Product"

The product will be saved to MongoDB with the image URL!

## Sample Image URLs for Testing

Use these free image URLs for testing:

```
Luxury Watch:
https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800

Sport Watch:
https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?w=800

Casual Watch:
https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800

Smart Watch:
https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800

Classic Watch:
https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=800
```

## Testing All CRUD Operations

### ✅ Create (Already tested above)

### ✅ Read (View Products)
- Products appear in the table automatically
- Use search box to find products
- Use pagination if you have 10+ products

### ✅ Update (Edit Product)
1. Click the **Edit** button (pencil icon) on any product
2. Modify any fields
3. Change image URL or upload new file
4. Click **Update Product**

### ✅ Delete (Remove Product)
1. Click the **Delete** button (trash icon) on any product
2. Confirm deletion
3. Product is removed from MongoDB

## Troubleshooting

### "Create Product" button not working
**Check:**
1. ✅ Backend is running (`npm run dev` in Backend folder)
2. ✅ Frontend is running (`npm start` in Frontend folder)
3. ✅ You're logged in as admin
4. ✅ All required fields are filled
5. ✅ Either image file OR image URL is provided

**Check Browser Console:**
- Press F12 to open Developer Tools
- Go to Console tab
- Look for error messages
- Common errors:
  - "Network Error" → Backend not running
  - "401 Unauthorized" → Not logged in or token expired
  - "400 Bad Request" → Missing required fields

**Check Backend Terminal:**
- Look for error messages
- Common errors:
  - MongoDB connection error → Check if MongoDB is running
  - Supabase error → Use image URL instead of file upload

### Image not displaying
**If using image URL:**
- Make sure URL is valid and accessible
- Try opening the URL in a new browser tab
- Use HTTPS URLs (not HTTP)

**If using file upload:**
- Supabase must be configured
- Check Backend/.env has correct Supabase credentials
- See SUPABASE_SETUP_GUIDE.md for setup

### Products not loading
1. Check MongoDB is running
2. Check backend terminal for errors
3. Check browser console for errors
4. Try refreshing the page

### "Failed to save product" error
1. Check all required fields are filled
2. Check image URL is valid OR file is selected
3. Check backend terminal for specific error
4. Try logging out and back in

## MongoDB Connection

Make sure MongoDB is running and connected:

**Check Backend Terminal:**
You should see:
```
✅ MongoDB connected successfully
🚀 Server running on port 5000
```

**If MongoDB not connected:**
1. Start MongoDB service
2. Check MONGODB_URI in Backend/.env
3. Default: `mongodb://localhost:27017/watch-store`

## API Endpoints Being Used

When you click buttons, these API calls are made:

```
Create Product:
POST http://localhost:5000/api/admin/products
Headers: Authorization: Bearer <admin-token>
Body: FormData with product fields

Get Products:
GET http://localhost:5000/api/admin/products?page=1&limit=10
Headers: Authorization: Bearer <admin-token>

Update Product:
PUT http://localhost:5000/api/admin/products/:id
Headers: Authorization: Bearer <admin-token>
Body: FormData with updated fields

Delete Product:
DELETE http://localhost:5000/api/admin/products/:id
Headers: Authorization: Bearer <admin-token>
```

## Testing Checklist

- [ ] Backend running (port 5000)
- [ ] Frontend running (port 3000)
- [ ] MongoDB connected
- [ ] Admin logged in
- [ ] Products tab visible
- [ ] Can click "Add Product" button
- [ ] Modal opens
- [ ] Can fill all fields
- [ ] Can provide image URL
- [ ] Can click "Create Product"
- [ ] Product appears in table
- [ ] Can search products
- [ ] Can edit product
- [ ] Can delete product

## Success Indicators

✅ **Create Working:**
- Modal closes after clicking "Create Product"
- Alert shows "Product created successfully!"
- New product appears in table
- Product has image displayed

✅ **Read Working:**
- Products load in table
- Images display correctly
- Search filters products
- Pagination works

✅ **Update Working:**
- Edit modal opens with existing data
- Changes save successfully
- Alert shows "Product updated successfully!"
- Updated data appears in table

✅ **Delete Working:**
- Confirmation dialog appears
- Alert shows "Product deleted successfully!"
- Product removed from table

## Next Steps

Once basic CRUD is working:

1. **Add More Products**: Create a full inventory
2. **Test Search**: Search by name, brand
3. **Test Pagination**: Add 10+ products to test
4. **Setup Supabase** (Optional): For file uploads
   - See SUPABASE_SETUP_GUIDE.md
   - Then you can upload files instead of URLs

## Need Help?

1. **Check Console**: Browser F12 → Console tab
2. **Check Backend**: Terminal running backend
3. **Check MongoDB**: Make sure it's running
4. **Check Login**: Make sure admin token is valid

## Common Solutions

**Problem**: Button does nothing
**Solution**: Check browser console for errors

**Problem**: "Network Error"
**Solution**: Start backend server

**Problem**: "401 Unauthorized"
**Solution**: Login again as admin

**Problem**: "Product image is required"
**Solution**: Provide image URL or upload file

**Problem**: Products not loading
**Solution**: Check MongoDB connection

---

**You can now fully test product management without Supabase!** 🎉

Just use image URLs instead of uploading files, and everything will work with MongoDB!
