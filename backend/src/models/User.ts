/**
 * Modelo de Usuario
 */

import mongoose, { Document, Schema } from 'mongoose';

export interface IWebAuthnCredential {
  id: string;
  publicKey: string;
  counter: number;
  deviceType: string;
  createdAt: Date;
}

export interface IUserProfile {
  edad?: number;
  genero?: 'masculino' | 'femenino' | 'otro' | 'prefiero_no_decir';
  telefono?: string;
  ciudad?: string;
  provincia?: string;
  avatarUrl?: string;
}

export interface IUser extends Document {
  nombre: string;
  email: string;
  cedula: string; // Número de cédula/DNI
  password?: string;
  role: 'usuario' | 'docente' | 'admin';
  webauthnCredentials: IWebAuthnCredential[];
  faceData?: string[]; // Array de imágenes faciales en base64 (legacy)
  faceDescriptors?: number[][]; // Array de descriptores faciales (128 dimensiones cada uno)
  profile?: IUserProfile;
  otpCode?: string;
  otpExpires?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    cedula: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      select: false,
    },
    role: {
      type: String,
      enum: ['usuario', 'docente', 'admin'],
      default: 'usuario',
    },
    webauthnCredentials: [
      {
        id: String,
        publicKey: String,
        counter: Number,
        deviceType: String,
        createdAt: { type: Date, default: Date.now },
      },
    ],
    faceData: {
      type: [String],
      select: false, // No devolver por defecto por privacidad
    },
    faceDescriptors: {
      type: [[Number]], // Array de arrays de números (descriptores faciales)
      select: false, // No devolver por defecto por privacidad
    },
    profile: {
      edad: Number,
      genero: {
        type: String,
        enum: ['masculino', 'femenino', 'otro', 'prefiero_no_decir'],
      },
      telefono: String,
      ciudad: String,
      provincia: String,
      avatarUrl: String,
    },
    otpCode: String,
    otpExpires: Date,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IUser>('User', UserSchema);
