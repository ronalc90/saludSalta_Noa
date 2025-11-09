/**
 * Rutas de autenticación
 */

import { Router } from 'express';
import {
  register,
  login,
  webauthnRegisterOptions,
  webauthnRegisterVerify,
  webauthnLoginOptions,
  webauthnLoginVerify,
  faceLogin,
  changePassword,
  updateFace,
} from '../controllers/auth.controller';
import { authLimiter } from '../middleware/rateLimiter';
import { protect } from '../middleware/auth';

const router = Router();

router.post('/register', authLimiter, register);
router.post('/login', authLimiter, login);

// Face recognition routes
router.post('/face-login', authLimiter, faceLogin);

// WebAuthn routes
router.post('/webauthn/register-options', webauthnRegisterOptions);
router.post('/webauthn/register-verify', webauthnRegisterVerify);
router.post('/webauthn/login-options', webauthnLoginOptions);
router.post('/webauthn/login-verify', webauthnLoginVerify);

// Profile update routes (require authentication)
router.post('/change-password', protect, changePassword);
router.post('/update-face', protect, updateFace);

export default router;
