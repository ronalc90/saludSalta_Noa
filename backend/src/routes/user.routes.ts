/**
 * Rutas de usuarios
 */

import { Router } from 'express';
import { protect, authorize } from '../middleware/auth';
import {
  getProfile,
  updateProfile,
  getAllUsers,
  deleteUser,
} from '../controllers/user.controller';

const router = Router();

router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);

// Admin routes
router.get('/', protect, authorize('admin'), getAllUsers);
router.delete('/:id', protect, authorize('admin'), deleteUser);

export default router;
