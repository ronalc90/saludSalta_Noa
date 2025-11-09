/**
 * Rate Limiting para protección contra abuso
 */

import rateLimit from 'express-rate-limit';

export const rateLimiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'), // 15 minutos
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'),
  message: 'Demasiadas solicitudes desde esta IP, intente nuevamente más tarde',
  standardHeaders: true,
  legacyHeaders: false,
});

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 10,
  message: 'Demasiados intentos de inicio de sesión, intente nuevamente más tarde',
  skipSuccessfulRequests: true,
});
