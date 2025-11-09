/**
 * Middleware de autenticación JWT
 */

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';

export interface AuthRequest extends Request {
  user?: any;
}

// Helper para obtener JWT_SECRET (lee directamente de process.env para asegurar que está cargado)
const getJWTSecret = () => process.env.JWT_SECRET || 'default-secret-change-in-production';

export const protect = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    let token: string | undefined;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({ message: 'No autorizado, token no encontrado' });
    }

    const JWT_SECRET = getJWTSecret();
    console.log('🔐 Verificando token con secreto:', JWT_SECRET.substring(0, 30) + '...');
    console.log('🎫 Token recibido:', token.substring(0, 50) + '...');

    const decoded: any = jwt.verify(token, JWT_SECRET);
    console.log('✅ Token decodificado exitosamente:', decoded);

    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      console.log('❌ Usuario no encontrado en BD:', decoded.id);
      return res.status(401).json({ message: 'Usuario no encontrado' });
    }

    console.log('✅ Usuario autenticado:', user.email);
    req.user = user;
    next();
  } catch (error) {
    console.log('❌ Error verificando token:', error);
    return res.status(401).json({ message: 'No autorizado, token inválido' });
  }
};

export const authorize = (...roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ message: 'No autorizado' });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: `Rol ${req.user.role} no autorizado para acceder a este recurso`,
      });
    }

    next();
  };
};
