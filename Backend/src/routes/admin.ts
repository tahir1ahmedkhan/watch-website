import { Router } from 'express';
import {
  adminLogin,
  getAdminProfile,
  getDashboardStats,
  getAllUsers,
  getAllOrders,
  updateOrderStatus,
  createAdmin
} from '../controllers/adminController';
import { authenticateAdmin, requireSuperAdmin } from '../middleware/adminAuth';
import { validateLogin, validateUpdateOrderStatus } from '../middleware/validation';
import { body } from 'express-validator';

const router = Router();

// Admin validation
const validateAdminLogin = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
];

const validateCreateAdmin = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  body('firstName')
    .trim()
    .isLength({ min: 1 })
    .withMessage('First name is required'),
  body('lastName')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Last name is required'),
  body('role')
    .optional()
    .isIn(['admin', 'super-admin'])
    .withMessage('Invalid role')
];

// Public routes
router.post('/login', validateAdminLogin, adminLogin);

// Protected routes
router.get('/profile', authenticateAdmin, getAdminProfile);
router.get('/dashboard/stats', authenticateAdmin, getDashboardStats);
router.get('/users', authenticateAdmin, getAllUsers);
router.get('/orders', authenticateAdmin, getAllOrders);
router.patch('/orders/:id/status', authenticateAdmin, validateUpdateOrderStatus, updateOrderStatus);

// Super admin only routes
router.post('/create-admin', authenticateAdmin, requireSuperAdmin, validateCreateAdmin, createAdmin);

export default router;