# ✅ Database Successfully Seeded!

Your MongoDB Atlas database has been populated with sample data.

## 📊 What Was Added

### 👤 Admin Account (1)
- **Email**: admin@watchstore.com
- **Password**: admin123
- **Role**: super-admin

### 👥 Users (5)
All users have password: `password123`

1. **John Doe** - john.doe@example.com
   - Location: New York, NY
   - Phone: +1234567890

2. **Jane Smith** - jane.smith@example.com
   - Location: Los Angeles, CA
   - Phone: +1234567891

3. **Mike Johnson** - mike.johnson@example.com
   - Location: Chicago, IL
   - Phone: +1234567892

4. **Sarah Williams** - sarah.williams@example.com
   - Location: Houston, TX
   - Phone: +1234567893

5. **David Brown** - david.brown@example.com
   - Location: Phoenix, AZ
   - Phone: +1234567894

### ⌚ Products (8)
1. **Rolex Submariner** - $1,200 (Diving)
2. **Apple Watch Series 9** - $499 (Smartwatch)
3. **Casio G-Shock** - $199 (Sports)
4. **Omega Speedmaster** - $3,500 (Chronograph)
5. **TAG Heuer Formula 1** - $1,100 (Sports)
6. **Seiko Prospex** - $350 (Diving)
7. **Citizen Eco-Drive** - $275 (Casual)
8. **Tissot PRX Powermatic 80** - $650 (Dress)

### 📦 Orders (7)
- **2 Delivered** orders (with tracking numbers)
- **2 Shipped** orders (with tracking numbers)
- **2 Processing** orders
- **1 Pending** order

Order statuses include:
- Delivered: ORD-2026-001, ORD-2026-005
- Shipped: ORD-2026-002, ORD-2026-006
- Processing: ORD-2026-003, ORD-2026-007
- Pending: ORD-2026-004

## 🔗 MongoDB Atlas Connection
```
mongodb+srv://tahirahmedkhan7_db_user:Q0VYXM3wwxoIrRdt@cluster0.ddxdp4q.mongodb.net/watch-store
```

## 🚀 How to Access

### Admin Dashboard
1. Start backend: `cd Backend && npm run dev`
2. Start frontend: `cd Frontend && npm start`
3. Go to: http://localhost:3000/admin/login
4. Login with: admin@watchstore.com / admin123

### Customer Login
Use any of the 5 user accounts with password: `password123`

## 📝 Features You Can Test

### As Admin:
- ✅ View dashboard statistics
- ✅ Manage all users
- ✅ View and update orders
- ✅ Change order status
- ✅ Add tracking numbers
- ✅ Manage products

### As Customer:
- ✅ Browse 8 products
- ✅ View product details
- ✅ Add to cart
- ✅ Place orders
- ✅ View order history

## 🔄 Re-seed Database

To clear and re-seed all data:
```cmd
cd Backend
npx ts-node src/scripts/seedAll.ts
```

## 📦 Individual Seeding Scripts

- **Seed only products**: `npx ts-node src/scripts/seedDatabase.ts`
- **Reset admin password**: `npx ts-node src/scripts/resetAdminPassword.ts`
- **List all admins**: `npx ts-node src/scripts/listAdmins.ts`
- **Check admin**: `npx ts-node src/scripts/checkAdmin.ts`

## 💡 Tips

1. All passwords are hashed with bcrypt (12 salt rounds)
2. Orders include calculated tax (8%) and shipping ($15 or free over $500)
3. Each user has a default shipping address
4. Products have realistic stock counts and ratings
5. Orders are linked to real users and products

Enjoy testing your watch store! 🎉
