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

// Middleware de seguridad
app.use(helmet());

// Configuración de CORS para múltiples orígenes
const allowedOrigins = [
  'http://localhost:3000',
  'https://www.saludadultomayor.org',
  'https://saludadultomayor.org',
  process.env.FRONTEND_URL,
].filter(Boolean); // Eliminar valores undefined

app.use(cors({
  origin: (origin, callback) => {
    // Permitir requests sin origen (como Postman, curl, apps móviles)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.warn(`⚠️  Origen bloqueado por CORS: ${origin}`);
      callback(new Error('No permitido por CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

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
