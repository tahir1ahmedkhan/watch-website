# Admin Products Management - Quick Guide

## Accessing Products Management

1. Login to admin dashboard at `/admin/login`
2. Click on **Products** tab in the sidebar (watch icon)

## Adding a New Product

1. Click **Add Product** button (top right)
2. Fill in all required fields:
   - **Product Image**: Click "Upload Image" to select an image file
   - **Product Name**: Full name of the watch
   - **Price**: Product price in dollars
   - **Brand**: Watch brand (e.g., Rolex, Omega)
   - **Category**: Select from dropdown (Luxury, Sport, Casual, Dress, Smart)
   - **Movement**: Type of movement (e.g., Automatic, Quartz)
   - **Case Material**: Material of the case (e.g., Stainless Steel)
   - **Case Size**: Size of the case (e.g., 42mm)
   - **Water Resistance**: Water resistance rating (e.g., 100m)
   - **Warranty**: Warranty period (e.g., 2 Years)
   - **Stock Count**: Number of items in stock
   - **Description**: Detailed product description
   - **In Stock**: Toggle to mark as available
3. Click **Create Product**

## Editing a Product

1. Find the product in the table
2. Click the **Edit** button (pencil icon)
3. Update any fields you want to change
4. To change the image, click "Change Image" and select a new file
5. Click **Update Product**

**Note**: When you upload a new image, the old image is automatically deleted from storage.

## Deleting a Product

1. Find the product in the table
2. Click the **Delete** button (trash icon)
3. Confirm the deletion

**Note**: Deleting a product also deletes its image from storage.

## Searching Products

- Use the search box at the top of the table
- Search by product name, brand, or description
- Results update automatically as you type

## Pagination

- Use **Previous** and **Next** buttons at the bottom
- Shows 10 products per page
- Current page and total pages displayed

## Product Status

Products show status badges:
- **Green "In Stock"**: Product is available for purchase
- **Red "Out of Stock"**: Product is not available

## Image Requirements

- **Supported Formats**: JPEG, JPG, PNG, WebP, GIF
- **Maximum Size**: 5MB
- **Recommended Size**: 800x800 pixels or larger
- **Aspect Ratio**: Square (1:1) works best

## Tips for Best Results

### Product Images
- Use high-quality, clear images
- Show the watch from the front
- Use white or neutral background
- Ensure good lighting
- Keep consistent style across all products

### Product Names
- Be descriptive but concise
- Include brand and model
- Example: "Rolex Submariner Date 41mm"

### Descriptions
- Highlight key features
- Mention unique selling points
- Include technical specifications
- Keep it engaging and informative

### Pricing
- Enter price without currency symbol
- Use decimal for cents (e.g., 1299.99)
- System automatically formats with $ symbol

### Stock Management
- Keep stock count accurate
- Uncheck "In Stock" when out of stock
- Update stock after each sale

## Common Tasks

### Updating Stock After Sale
1. Find the product
2. Click Edit
3. Decrease Stock Count
4. If stock reaches 0, uncheck "In Stock"
5. Click Update Product

### Changing Product Price
1. Find the product
2. Click Edit
3. Update Price field
4. Click Update Product

### Updating Product Image
1. Find the product
2. Click Edit
3. Click "Change Image"
4. Select new image file
5. Preview appears automatically
6. Click Update Product

### Bulk Operations
Currently, you need to edit products one at a time. For bulk operations, contact your developer.

## Troubleshooting

### Image Won't Upload
- Check file size (must be under 5MB)
- Verify file format (JPEG, PNG, WebP, GIF only)
- Try a different image
- Check your internet connection

### Changes Not Saving
- Ensure all required fields are filled
- Check for error messages
- Verify you're logged in as admin
- Try refreshing the page and logging in again

### Product Not Appearing
- Check if you're on the correct page
- Use search to find the product
- Verify the product was created successfully
- Check for success message after creation

### Image Not Displaying
- Wait a few seconds for upload to complete
- Refresh the page
- Check if image was uploaded successfully
- Try uploading a different image

## Keyboard Shortcuts

- **Esc**: Close modal
- **Enter**: Submit form (when in text field)
- **Tab**: Navigate between form fields

## Best Practices

1. **Regular Updates**: Keep product information current
2. **Accurate Stock**: Update stock levels regularly
3. **Quality Images**: Use professional product photos
4. **Detailed Descriptions**: Provide comprehensive product details
5. **Consistent Pricing**: Review and update prices as needed
6. **Category Organization**: Use appropriate categories for easy browsing

## Security

- Only admins can access product management
- All changes are logged
- Images are stored securely in Supabase
- Old images are automatically deleted to save space

## Need Help?

If you encounter issues:
1. Check this guide first
2. Try logging out and back in
3. Clear browser cache
4. Contact technical support

---

**Remember**: All changes are immediate and affect the live store. Double-check before saving!
