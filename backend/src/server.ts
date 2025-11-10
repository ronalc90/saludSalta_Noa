/**
 * Servidor Express principal
 */

// IMPORTANTE: Cargar variables de entorno PRIMERO, antes de cualquier otro import
import dotenv from 'dotenv';
dotenv.config();

// Debug: Verificar que se cargó la variable de entorno
console.log('🔐 [SERVER] JWT_SECRET desde .env:', process.env.JWT_SECRET?.substring(0, 30) + '...');

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { connectDatabase } from './config/database';
import { errorHandler } from './middleware/errorHandler';
import { rateLimiter } from './middleware/rateLimiter';

// Rutas
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import claseRoutes from './routes/clase.routes';
import healthRoutes from './routes/health.routes';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware de seguridad - Configurar helmet antes de CORS
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" },
}));

// Configuración de CORS para múltiples orígenes
const allowedOrigins = [
  'http://localhost:3000',
  'https://www.saludadultomayor.org',
  'https://saludadultomayor.org',
  process.env.FRONTEND_URL,
].filter(Boolean); // Eliminar valores undefined

console.log('🌐 [CORS] Orígenes permitidos:', allowedOrigins);

// CORS middleware simplificado y robusto
app.use((req, res, next) => {
  const origin = req.headers.origin;

  console.log(`📡 [CORS] Request desde: ${origin || 'sin origen'} → ${req.method} ${req.path}`);

  // Aplicar headers CORS inmediatamente para TODOS los requests
  if (origin && allowedOrigins.includes(origin)) {
    // Establecer headers CORS ANTES de cualquier procesamiento
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept');
    res.setHeader('Access-Control-Max-Age', '86400');
    res.setHeader('Vary', 'Origin');

    console.log(`✅ [CORS] Headers aplicados para origen permitido: ${origin}`);
  } else if (origin) {
    console.warn(`⚠️  [CORS] Origen NO permitido: ${origin}`);
    console.warn(`⚠️  [CORS] Orígenes válidos:`, allowedOrigins);
  }

  // Manejar preflight OPTIONS inmediatamente
  if (req.method === 'OPTIONS') {
    console.log('✅ [CORS] Preflight OPTIONS respondido con status 200');
    return res.status(200).end();
  }

  next();
});

// Rate limiting
app.use(rateLimiter);

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Rutas API
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/clases', claseRoutes);
app.use('/api/health', healthRoutes);

// Manejo de errores
app.use(errorHandler);

// Conexión a base de datos e inicio del servidor
connectDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
      console.log(`📊 Entorno: ${process.env.NODE_ENV || 'development'}`);
    });
  })
  .catch((error) => {
    console.error('❌ Error al iniciar servidor:', error);
    process.exit(1);
  });

export default app;
