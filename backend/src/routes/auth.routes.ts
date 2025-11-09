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
} from '../controllers/auth.controller';
import { authLimiter } from '../middleware/rateLimiter';

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

export default router;
