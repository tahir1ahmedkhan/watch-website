# Product Image Upload Architecture

## System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                          ADMIN USER                                  │
│                     (Browser Interface)                              │
└────────────────────────────┬────────────────────────────────────────┘
                             │
                             │ HTTP Requests
                             │
┌────────────────────────────▼────────────────────────────────────────┐
│                      FRONTEND (React)                                │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │  AdminDashboardWorking.jsx                                    │  │
│  │  ├─ Dashboard Tab                                             │  │
│  │  ├─ Users Tab                                                 │  │
│  │  ├─ Orders Tab                                                │  │
│  │  └─ Products Tab ◄── NEW!                                     │  │
│  └──────────────────────────┬───────────────────────────────────┘  │
│                             │                                        │
│  ┌──────────────────────────▼───────────────────────────────────┐  │
│  │  ProductsTable.jsx                                            │  │
│  │  ├─ Product List Table                                        │  │
│  │  ├─ Search & Pagination                                       │  │
│  │  ├─ Create Product Modal                                      │  │
│  │  ├─ Edit Product Modal                                        │  │
│  │  └─ Image Upload Component                                    │  │
│  └──────────────────────────┬───────────────────────────────────┘  │
│                             │                                        │
│                             │ FormData with Image                    │
│                             │ (multipart/form-data)                  │
└────────────────────────────┬────────────────────────────────────────┘
                             │
                             │ POST/PUT/DELETE
                             │ /api/admin/products
                             │
┌────────────────────────────▼────────────────────────────────────────┐
│                    BACKEND (Node.js/Express)                         │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │  Routes (admin.ts)                                            │  │
│  │  ├─ GET    /api/admin/products                               │  │
│  │  ├─ POST   /api/admin/products                               │  │
│  │  ├─ PUT    /api/admin/products/:id                           │  │
│  │  └─ DELETE /api/admin/products/:id                           │  │
│  └──────────────────────────┬───────────────────────────────────┘  │
│                             │                                        │
│  ┌──────────────────────────▼───────────────────────────────────┐  │
│  │  Middleware                                                   │  │
│  │  ├─ authenticateAdmin (verify JWT token)                     │  │
│  │  └─ upload.single('image') (multer - process file)           │  │
│  └──────────────────────────┬───────────────────────────────────┘  │
│                             │                                        │
│  ┌──────────────────────────▼───────────────────────────────────┐  │
│  │  Controllers (productController.ts)                          │  │
│  │  ├─ createProduct()                                          │  │
│  │  ├─ updateProduct()                                          │  │
│  │  ├─ deleteProduct()                                          │  │
│  │  └─ getAdminProducts()                                       │  │
│  └──────────────────────────┬───────────────────────────────────┘  │
│                             │                                        │
│                    ┌────────┴────────┐                              │
│                    │                 │                              │
│         ┌──────────▼──────┐   ┌─────▼──────────┐                   │
│         │  Supabase Utils │   │  Product Model │                   │
│         │  (supabase.ts)  │   │  (MongoDB)     │                   │
│         │                 │   │                │                   │
│         │ uploadImage()   │   │ Save product   │                   │
│         │ deleteImage()   │   │ data with      │                   │
│         │                 │   │ image URL      │                   │
│         └────────┬────────┘   └────────┬───────┘                   │
│                  │                     │                            │
└──────────────────┼─────────────────────┼────────────────────────────┘
                   │                     │
                   │                     │
        ┌──────────▼──────┐   ┌─────────▼──────────┐
        │  SUPABASE       │   │  MONGODB           │
        │  Storage        │   │  Database          │
        │                 │   │                    │
        │  Bucket:        │   │  Collection:       │
        │  product-images │   │  products          │
        │                 │   │                    │
        │  Stores:        │   │  Stores:           │
        │  - Image files  │   │  - Product data    │
        │  - Public URLs  │   │  - Image URLs      │
        │                 │   │  - Metadata        │
        └─────────────────┘   └────────────────────┘
```

## Data Flow Diagrams

### 1. Create Product Flow

```
Admin                Frontend              Backend              Supabase         MongoDB
  │                     │                     │                    │               │
  │ Fill Form          │                     │                    │               │
  │ Select Image       │                     │                    │               │
  │ Click Create       │                     │                    │               │
  ├────────────────────►                     │                    │               │
  │                     │ POST /api/admin/   │                    │               │
  │                     │ products           │                    │               │
  │                     │ (FormData)         │                    │               │
  │                     ├────────────────────►                    │               │
  │                     │                     │ Verify Admin      │               │
  │                     │                     │ Token             │               │
  │                     │                     │                   │               │
  │                     │                     │ Process File      │               │
  │                     │                     │ (Multer)          │               │
  │                     │                     │                   │               │
  │                     │                     │ Upload Image      │               │
  │                     │                     ├───────────────────►               │
  │                     │                     │                   │               │
  │                     │                     │ Return Public URL │               │
  │                     │                     ◄───────────────────┤               │
  │                     │                     │                   │               │
  │                     │                     │ Save Product      │               │
  │                     │                     │ with Image URL    │               │
  │                     │                     ├───────────────────────────────────►
  │                     │                     │                   │               │
  │                     │                     │ Product Saved     │               │
  │                     │                     ◄───────────────────────────────────┤
  │                     │                     │                   │               │
  │                     │ Success Response   │                   │               │
  │                     ◄────────────────────┤                   │               │
  │                     │                     │                   │               │
  │ Product Created    │                     │                   │               │
  │ Image Displayed    │                     │                   │               │
  ◄────────────────────┤                     │                   │               │
  │                     │                     │                   │               │
```

### 2. Update Product Flow (with new image)

```
Admin                Frontend              Backend              Supabase         MongoDB
  │                     │                     │                    │               │
  │ Click Edit         │                     │                    │               │
  │ Change Fields      │                     │                    │               │
  │ Select New Image   │                     │                    │               │
  │ Click Update       │                     │                    │               │
  ├────────────────────►                     │                    │               │
  │                     │ PUT /api/admin/    │                    │               │
  │                     │ products/:id       │                    │               │
  │                     │ (FormData)         │                    │               │
  │                     ├────────────────────►                    │               │
  │                     │                     │ Verify Admin      │               │
  │                     │                     │                   │               │
  │                     │                     │ Get Old Product   │               │
  │                     │                     ├───────────────────────────────────►
  │                     │                     │                   │               │
  │                     │                     │ Old Product Data  │               │
  │                     │                     ◄───────────────────────────────────┤
  │                     │                     │                   │               │
  │                     │                     │ Delete Old Image  │               │
  │                     │                     ├───────────────────►               │
  │                     │                     │                   │               │
  │                     │                     │ Image Deleted     │               │
  │                     │                     ◄───────────────────┤               │
  │                     │                     │                   │               │
  │                     │                     │ Upload New Image  │               │
  │                     │                     ├───────────────────►               │
  │                     │                     │                   │               │
  │                     │                     │ New Public URL    │               │
  │                     │                     ◄───────────────────┤               │
  │                     │                     │                   │               │
  │                     │                     │ Update Product    │               │
  │                     │                     ├───────────────────────────────────►
  │                     │                     │                   │               │
  │                     │                     │ Product Updated   │               │
  │                     │                     ◄───────────────────────────────────┤
  │                     │                     │                   │               │
  │                     │ Success Response   │                   │               │
  │                     ◄────────────────────┤                   │               │
  │                     │                     │                   │               │
  │ Product Updated    │                     │                   │               │
  │ New Image Shown    │                     │                   │               │
  ◄────────────────────┤                     │                   │               │
  │                     │                     │                   │               │
```

### 3. Delete Product Flow

```
Admin                Frontend              Backend              Supabase         MongoDB
  │                     │                     │                    │               │
  │ Click Delete       │                     │                    │               │
  │ Confirm            │                     │                    │               │
  ├────────────────────►                     │                    │               │
  │                     │ DELETE /api/admin/ │                    │               │
  │                     │ products/:id       │                    │               │
  │                     ├────────────────────►                    │               │
  │                     │                     │ Verify Admin      │               │
  │                     │                     │                   │               │
  │                     │                     │ Get Product       │               │
  │                     │                     ├───────────────────────────────────►
  │                     │                     │                   │               │
  │                     │                     │ Product Data      │               │
  │                     │                     ◄───────────────────────────────────┤
  │                     │                     │                   │               │
  │                     │                     │ Delete Image      │               │
  │                     │                     ├───────────────────►               │
  │                     │                     │                   │               │
  │                     │                     │ Image Deleted     │               │
  │                     │                     ◄───────────────────┤               │
  │                     │                     │                   │               │
  │                     │                     │ Delete Product    │               │
  │                     │                     ├───────────────────────────────────►
  │                     │                     │                   │               │
  │                     │                     │ Product Deleted   │               │
  │                     │                     ◄───────────────────────────────────┤
  │                     │                     │                   │               │
  │                     │ Success Response   │                   │               │
  │                     ◄────────────────────┤                   │               │
  │                     │                     │                   │               │
  │ Product Removed    │                     │                   │               │
  ◄────────────────────┤                     │                   │               │
  │                     │                     │                   │               │
```

## Component Hierarchy

```
AdminDashboardWorking
├── Sidebar
│   ├── Dashboard Tab
│   ├── Users Tab
│   ├── Orders Tab
│   └── Products Tab ◄── NEW!
│
├── Header
│   ├── Title
│   ├── User Info
│   └── Logout Button
│
└── Content Area
    ├── DashboardStats (when Dashboard tab active)
    ├── UsersTable (when Users tab active)
    ├── OrdersTable (when Orders tab active)
    └── ProductsTable ◄── NEW! (when Products tab active)
        ├── Table Header
        │   ├── Title
        │   └── Add Product Button
        │
        ├── Search Box
        │
        ├── Products Table
        │   ├── Image Column
        │   ├── Name Column
        │   ├── Brand Column
        │   ├── Category Column
        │   ├── Price Column
        │   ├── Stock Column
        │   ├── Status Column
        │   └── Actions Column
        │       ├── Edit Button
        │       └── Delete Button
        │
        ├── Pagination
        │   ├── Previous Button
        │   ├── Page Info
        │   └── Next Button
        │
        └── Product Modal (Create/Edit)
            ├── Modal Header
            │   ├── Title
            │   └── Close Button
            │
            ├── Modal Body (Form)
            │   ├── Image Upload Section
            │   │   ├── Image Preview
            │   │   └── Upload Button
            │   │
            │   ├── Product Name Input
            │   ├── Price Input
            │   ├── Brand Input
            │   ├── Category Dropdown
            │   ├── Movement Input
            │   ├── Case Material Input
            │   ├── Case Size Input
            │   ├── Water Resistance Input
            │   ├── Warranty Input
            │   ├── Stock Count Input
            │   ├── Description Textarea
            │   └── In Stock Checkbox
            │
            └── Modal Footer
                ├── Cancel Button
                └── Save Button
```

## Technology Stack

```
┌─────────────────────────────────────────────────────────┐
│                    FRONTEND STACK                        │
├─────────────────────────────────────────────────────────┤
│  React 18.x          - UI Framework                     │
│  React Router 6.x    - Routing                          │
│  Axios               - HTTP Client                      │
│  CSS3                - Styling (with animations)        │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│                    BACKEND STACK                         │
├─────────────────────────────────────────────────────────┤
│  Node.js             - Runtime                          │
│  Express.js          - Web Framework                    │
│  TypeScript          - Type Safety                      │
│  Multer              - File Upload Middleware           │
│  @supabase/supabase-js - Supabase Client               │
│  JWT                 - Authentication                   │
│  Mongoose            - MongoDB ODM                      │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│                    STORAGE & DATABASE                    │
├─────────────────────────────────────────────────────────┤
│  Supabase Storage    - Image Storage (Cloud)            │
│  MongoDB             - Product Data (Database)          │
└─────────────────────────────────────────────────────────┘
```

## Security Layers

```
┌─────────────────────────────────────────────────────────┐
│  Layer 1: Frontend Authentication                        │
│  - Check for admin token in localStorage                │
│  - Redirect to login if not authenticated               │
│  - Include token in all API requests                    │
└────────────────────┬────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────┐
│  Layer 2: Backend Authentication Middleware             │
│  - Verify JWT token                                     │
│  - Check admin role                                     │
│  - Reject unauthorized requests                         │
└────────────────────┬────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────┐
│  Layer 3: File Validation                               │
│  - Check file type (images only)                        │
│  - Check file size (max 5MB)                            │
│  - Validate file format                                 │
└────────────────────┬────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────┐
│  Layer 4: Supabase Storage Policies                     │
│  - Public read access                                   │
│  - Authenticated write access                           │
│  - Bucket-level permissions                             │
└─────────────────────────────────────────────────────────┘
```

## File Upload Process

```
1. User selects image file
   │
   ├─► File stored in browser memory
   │
2. User submits form
   │
   ├─► FormData created with all fields
   │
   ├─► Image file added to FormData
   │
3. Frontend sends POST/PUT request
   │
   ├─► Content-Type: multipart/form-data
   │
   ├─► Authorization header with JWT token
   │
4. Backend receives request
   │
   ├─► Multer middleware processes file
   │
   ├─► File stored in memory buffer
   │
5. Controller handles request
   │
   ├─► Validates admin authentication
   │
   ├─► Calls uploadImage() utility
   │
6. Supabase upload
   │
   ├─► Generate unique filename
   │
   ├─► Upload buffer to Supabase Storage
   │
   ├─► Get public URL
   │
7. Database save
   │
   ├─► Save product data to MongoDB
   │
   ├─► Include Supabase image URL
   │
8. Response sent
   │
   ├─► Success message
   │
   ├─► Product data with image URL
   │
9. Frontend updates
   │
   ├─► Close modal
   │
   ├─► Refresh product list
   │
   └─► Display new product with image
```

This architecture provides a scalable, secure, and maintainable solution for product image management!
