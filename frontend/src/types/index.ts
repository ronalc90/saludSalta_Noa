/**
 * Tipos compartidos para la aplicación Fabi
 */

export type UserRole = 'usuario' | 'docente' | 'admin';

export interface User {
  _id: string;
  nombre: string;
  email: string;
  cedula?: string;
  role: UserRole;
  profile?: UserProfile;
  password?: boolean; // Indica si tiene contraseña configurada
  faceDescriptors?: number[][]; // Descriptores faciales (si están configurados)
  createdAt?: string;
  updatedAt?: string;
}

export interface UserProfile {
  edad?: number;
  genero?: 'masculino' | 'femenino' | 'otro' | 'prefiero_no_decir';
  telefono?: string;
  ciudad?: string;
  provincia?: string;
  avatarUrl?: string;
}

export interface LoginCredentials {
  email: string;
  password?: string;
  otp?: string;
}

export interface RegisterData {
  nombre: string;
  email: string;
  password: string;
  consentimiento: boolean;
}

export interface AuthResponse {
  user: User;
  token: string;
  message: string;
}

export interface Clase {
  _id: string;
  titulo: string;
  descripcion: string;
  autorId: string;
  autorNombre?: string;
  tipo: 'video' | 'pdf' | 'articulo';
  mediaUrl?: string;
  thumbnailUrl?: string;
  tags: string[];
  categoria: string;
  duracion?: number; // en minutos
  visibility: 'publica' | 'privada';
  createdAt: string;
  updatedAt: string;
}

export interface CreateClaseData {
  titulo: string;
  descripcion: string;
  tipo: 'video' | 'pdf' | 'articulo';
  mediaUrl?: string;
  tags: string[];
  categoria: string;
  duracion?: number;
  visibility: 'publica' | 'privada';
}

export interface IMCRegistro {
  _id: string;
  userId: string;
  pesoKg: number;
  alturaCm: number;
  imc: number;
  categoria: 'bajo_peso' | 'normal' | 'sobrepeso' | 'obesidad' | 'obesidad_severa';
  recomendaciones: string[];
  fecha: string;
}

export interface CalcularIMCData {
  pesoKg: number;
  alturaCm: number;
}

export interface IMCResult {
  imc: number;
  categoria: string;
  recomendaciones: string[];
  riesgos?: string[];
  registroId?: string;
}

export interface Sintoma {
  id: string;
  nombre: string;
  descripcion?: string;
}

export interface PrediccionRequest {
  sintomas: string[];
  detallesAdicionales?: string;
  consentimiento: boolean;
}

export interface PrediccionResult {
  predicciones: Array<{
    enfermedad: string;
    probabilidad: number;
    descripcion: string;
  }>;
  recomendaciones: string[];
  urgencia: 'baja' | 'media' | 'alta';
  disclaimer: string;
}

export interface Notificacion {
  _id: string;
  texto: string;
  userId?: string;
  tipo: 'info' | 'warning' | 'success' | 'error';
  leida: boolean;
  visibleHasta?: string;
  createdAt: string;
}

export interface EstadisticasDocente {
  totalClases: number;
  totalVistas: number;
  clasesRecientes: Clase[];
  categorias: Record<string, number>;
}

export interface WebAuthnCredential {
  id: string;
  publicKey: string;
  counter: number;
  deviceType: string;
  createdAt: string;
}

export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
  statusCode: number;
}
