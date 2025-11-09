/**
 * Controlador de autenticación
 */

import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { AuthRequest } from '../middleware/auth';
import {
  generateRegistrationOptions,
  verifyRegistrationResponse,
  generateAuthenticationOptions,
  verifyAuthenticationResponse,
} from '@simplewebauthn/server';

// Helper para obtener JWT_SECRET (lee directamente de process.env para asegurar que está cargado)
const getJWTSecret = () => process.env.JWT_SECRET || 'default-secret-change-in-production';

const RP_NAME = process.env.WEBAUTHN_RP_NAME || 'Plataforma Salud Fabi';
const RP_ID = process.env.WEBAUTHN_RP_ID || 'localhost';
const ORIGIN = process.env.WEBAUTHN_ORIGIN || 'http://localhost:3000';

const generateToken = (id: string): string => {
  const JWT_SECRET = getJWTSecret();
  console.log('🔑 [Generando token] JWT_SECRET:', JWT_SECRET.substring(0, 30) + '...');
  return jwt.sign({ id }, JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
};

export const register = async (req: Request, res: Response) => {
  try {
    const { nombre, email, cedula, password, consentimiento, faceData, faceDescriptors, role } = req.body;

    if (!consentimiento) {
      return res.status(400).json({ message: 'Debe aceptar el consentimiento' });
    }

    if (!cedula) {
      return res.status(400).json({ message: 'La cédula es requerida' });
    }

    const existingUser = await User.findOne({ $or: [{ email }, { cedula }] });
    if (existingUser) {
      if (existingUser.email === email) {
        return res.status(400).json({ message: 'El email ya está registrado' });
      }
      if (existingUser.cedula === cedula) {
        return res.status(400).json({ message: 'La cédula ya está registrada' });
      }
    }

    const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;

    // Validar descriptores faciales si se proporcionan
    if (faceDescriptors && faceDescriptors.length > 0) {
      console.log(`✅ Guardando ${faceDescriptors.length} descriptores faciales para el usuario`);
      // Validar que cada descriptor tenga 128 dimensiones (estándar de face-api.js)
      for (const desc of faceDescriptors) {
        if (!Array.isArray(desc) || desc.length !== 128) {
          return res.status(400).json({
            message: 'Descriptores faciales inválidos. Cada descriptor debe tener 128 dimensiones.'
          });
        }
      }
    }

    // Validar y establecer el rol
    const userRole = role === 'docente' || role === 'admin' ? role : 'usuario';

    const user = await User.create({
      nombre,
      email,
      cedula,
      password: hashedPassword,
      faceData: faceData || undefined, // Legacy - mantener por compatibilidad
      faceDescriptors: faceDescriptors || undefined,
      role: userRole,
    });

    const token = generateToken(user._id.toString());

    res.status(201).json({
      user: {
        _id: user._id,
        nombre: user.nombre,
        email: user.email,
        cedula: user.cedula,
        role: user.role,
        password: !!hashedPassword,
        faceDescriptors: !!(faceDescriptors && faceDescriptors.length > 0) ? [] : undefined,
      },
      token,
      message: 'Registro exitoso',
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');
    if (!user || !user.password) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const token = generateToken(user._id.toString());

    // Verificar si tiene reconocimiento facial configurado
    const userWithFaceData = await User.findById(user._id).select('+faceDescriptors');
    const hasFaceAuth = !!(userWithFaceData?.faceDescriptors && userWithFaceData.faceDescriptors.length > 0);

    res.json({
      user: {
        _id: user._id,
        nombre: user.nombre,
        email: user.email,
        cedula: user.cedula,
        role: user.role,
        profile: user.profile,
        password: !!user.password,
        faceDescriptors: hasFaceAuth ? [] : undefined,
      },
      token,
      message: 'Login exitoso',
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const webauthnRegisterOptions = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const options = await generateRegistrationOptions({
      rpName: RP_NAME,
      rpID: RP_ID,
      userID: user._id.toString(),
      userName: user.email,
      userDisplayName: user.nombre,
      attestationType: 'none',
      authenticatorSelection: {
        residentKey: 'preferred',
        userVerification: 'preferred',
      },
    });

    res.json(options);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const webauthnRegisterVerify = async (req: Request, res: Response) => {
  try {
    const { email, credential } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const verification = await verifyRegistrationResponse({
      response: credential,
      expectedChallenge: credential.challenge || '',
      expectedOrigin: ORIGIN,
      expectedRPID: RP_ID,
    });

    if (!verification.verified || !verification.registrationInfo) {
      return res.status(400).json({ message: 'Verificación fallida' });
    }

    user.webauthnCredentials.push({
      id: verification.registrationInfo.credentialID.toString(),
      publicKey: Buffer.from(verification.registrationInfo.credentialPublicKey).toString('base64'),
      counter: verification.registrationInfo.counter,
      deviceType: 'platform',
      createdAt: new Date(),
    });

    await user.save();

    res.json({ verified: true, message: 'Credencial registrada exitosamente' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const webauthnLoginOptions = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user || user.webauthnCredentials.length === 0) {
      return res.status(404).json({ message: 'No hay credenciales registradas' });
    }

    const options = await generateAuthenticationOptions({
      rpID: RP_ID,
      userVerification: 'preferred',
    });

    res.json(options);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const webauthnLoginVerify = async (req: Request, res: Response) => {
  try {
    const { email, credential } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Simplified verification for demo purposes
    const token = generateToken(user._id.toString());

    res.json({
      user: {
        _id: user._id,
        nombre: user.nombre,
        email: user.email,
        role: user.role,
        profile: user.profile,
      },
      token,
      message: 'Login exitoso con WebAuthn',
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Función auxiliar para comparar imágenes faciales
const compareFaceImages = (storedImages: string[], capturedImage: string): boolean => {
  // Comparación simple: verificar que la imagen capturada sea similar a alguna de las almacenadas
  // En producción, usar una librería de reconocimiento facial como face-api.js

  // Extraer datos base64 sin el prefijo
  const extractBase64 = (img: string) => img.replace(/^data:image\/\w+;base64,/, '');
  const capturedData = extractBase64(capturedImage);

  // Verificar similitud básica con cada imagen almacenada
  for (const storedImage of storedImages) {
    const storedData = extractBase64(storedImage);

    // Comparación simple por tamaño (en producción usar ML)
    const sizeDiff = Math.abs(capturedData.length - storedData.length);
    const sizeThreshold = storedData.length * 0.3; // 30% de diferencia permitida

    if (sizeDiff < sizeThreshold) {
      // Las imágenes son de tamaño similar
      return true;
    }
  }

  return false;
};

export const faceLogin = async (req: Request, res: Response) => {
  try {
    const { cedula, faceData, password } = req.body;

    if (!cedula || !faceData) {
      return res.status(400).json({ message: 'Cédula y datos faciales son requeridos' });
    }

    // Buscar usuario por cédula con datos faciales y contraseña
    const user = await User.findOne({ cedula }).select('+faceData +faceDescriptors +password');

    if (!user) {
      return res.status(404).json({
        message: 'No se encontró usuario con esa cédula'
      });
    }

    // Si es docente, verificar contraseña primero
    if (user.role === 'docente') {
      if (!password) {
        return res.status(400).json({
          message: 'Los docentes deben ingresar su contraseña además del reconocimiento facial'
        });
      }

      if (!user.password) {
        return res.status(400).json({
          message: 'Este usuario no tiene contraseña configurada'
        });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({
          message: 'Contraseña incorrecta'
        });
      }
    }

    // Verificar que tenga al menos uno de los dos métodos de reconocimiento facial
    const hasFaceData = user.faceData && user.faceData.length > 0;
    const hasFaceDescriptors = user.faceDescriptors && user.faceDescriptors.length > 0;

    if (!hasFaceData && !hasFaceDescriptors) {
      return res.status(400).json({
        message: 'Este usuario no tiene reconocimiento facial configurado'
      });
    }

    // Comparar rostro capturado con los rostros almacenados
    const isMatch = compareFaceImages(user.faceData || [], faceData);

    if (!isMatch) {
      return res.status(401).json({
        message: 'El rostro no coincide con la cédula proporcionada'
      });
    }

    // Generar token
    const token = generateToken(user._id.toString());

    res.json({
      user: {
        _id: user._id,
        nombre: user.nombre,
        email: user.email,
        cedula: user.cedula,
        role: user.role,
        profile: user.profile,
        password: !!user.password,
        faceDescriptors: hasFaceDescriptors ? [] : undefined,
      },
      token,
      message: `¡Bienvenido/a ${user.nombre}!`,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const changePassword = async (req: AuthRequest, res: Response) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user._id;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: 'Contraseña actual y nueva contraseña son requeridas' });
    }

    const user = await User.findById(userId).select('+password');
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    if (!user.password) {
      return res.status(400).json({ message: 'Este usuario no tiene contraseña configurada' });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Contraseña actual incorrecta' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.json({ message: 'Contraseña actualizada exitosamente' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateFace = async (req: AuthRequest, res: Response) => {
  try {
    const { faceImages, faceDescriptors } = req.body;
    const userId = req.user._id;

    if (!faceDescriptors || faceDescriptors.length === 0) {
      return res.status(400).json({ message: 'Descriptores faciales son requeridos' });
    }

    // Validar que cada descriptor tenga 128 dimensiones
    for (const desc of faceDescriptors) {
      if (!Array.isArray(desc) || desc.length !== 128) {
        return res.status(400).json({
          message: 'Descriptores faciales inválidos. Cada descriptor debe tener 128 dimensiones.'
        });
      }
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    user.faceDescriptors = faceDescriptors;
    if (faceImages) {
      user.faceData = faceImages;
    }
    await user.save();

    res.json({ message: 'Identificación facial actualizada exitosamente' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
