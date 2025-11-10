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

// Configuración de CORS para múltiples orígenes
const allowedOrigins = [
  'http://localhost:3000',
  'https://www.saludadultomayor.org',
  'https://saludadultomayor.org',
  process.env.FRONTEND_URL,
].filter(Boolean); // Eliminar valores undefined

console.log('🌐 [CORS] Orígenes permitidos:', allowedOrigins);

// Configuración CORS usando el paquete oficial (mejor compatibilidad con proxies)
const corsOptions = {
  origin: function (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) {
    console.log(`📡 [CORS] Verificando origen: ${origin || 'sin origen'}`);

    // Permitir requests sin origin (como Postman, cURL, o server-to-server)
    if (!origin) {
      console.log('✅ [CORS] Request sin origin permitido');
      return callback(null, true);
    }

    // Verificar si el origin está en la lista permitida
    if (allowedOrigins.includes(origin)) {
      console.log(`✅ [CORS] Origen permitido: ${origin}`);
      return callback(null, true);
    }

    console.warn(`❌ [CORS] Origen bloqueado: ${origin}`);
    console.warn(`⚠️  [CORS] Orígenes válidos:`, allowedOrigins);
    callback(new Error(`Origen no permitido por CORS: ${origin}`), false);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  maxAge: 86400, // 24 horas
  optionsSuccessStatus: 200
};

// Aplicar CORS antes de helmet para evitar conflictos
app.use(cors(corsOptions));

// Middleware adicional para FORZAR headers CORS (Railway sobrescribe headers)
app.use((req, res, next) => {
  const origin = req.headers.origin;

  if (origin && allowedOrigins.includes(origin)) {
    // Forzar headers en cada respuesta interceptando writeHead
    const originalWriteHead = res.writeHead;
    const originalEnd = res.end;
    const originalSend = res.send;

    // Función para forzar headers
    const forceHeaders = () => {
      res.setHeader('Access-Control-Allow-Origin', origin);
      res.setHeader('Access-Control-Allow-Credentials', 'true');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept');
      console.log(`🔒 [FORCE-CORS] Headers forzados para: ${origin}`);
    };

    // Interceptar writeHead (se llama antes de enviar headers)
    res.writeHead = function(this: any, ...args: any[]) {
      forceHeaders();
      return originalWriteHead.apply(this, args as any);
    };

    // Interceptar end (último recurso)
    res.end = function(this: any, ...args: any[]) {
      forceHeaders();
      return originalEnd.apply(this, args as any);
    } as any;

    // Interceptar send
    res.send = function(this: any, ...args: any[]) {
      forceHeaders();
      return originalSend.apply(this, args as any);
    } as any;
  }

  next();
});

// Middleware de seguridad - Configurar helmet después de CORS
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" },
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

// Endpoint de diagnóstico CORS
app.options('/api/cors-test', (req, res) => {
  console.log('🔍 [CORS-TEST] Headers recibidos:', req.headers);
  console.log('🔍 [CORS-TEST] Origin:', req.headers.origin);
  res.status(200).end();
});

app.get('/api/cors-test', (req, res) => {
  console.log('🔍 [CORS-TEST] GET - Headers enviados:', res.getHeaders());
  res.json({
    message: 'CORS Test OK',
    origin: req.headers.origin,
    headersRecibidos: req.headers,
    headersEnviados: res.getHeaders()
  });
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
