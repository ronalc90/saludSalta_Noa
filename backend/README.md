# Backend API - Plataforma Salud Fabi

Backend API desarrollado con Node.js, Express, TypeScript y MongoDB.

## Características

- ✅ Express.js con TypeScript
- ✅ MongoDB con Mongoose
- ✅ Autenticación JWT
- ✅ WebAuthn/FIDO2 support
- ✅ Rate limiting
- ✅ Helmet para seguridad
- ✅ CORS configurado
- ✅ Validación de datos

## Estructura de Carpetas

```
src/
├── config/           # Configuración
│   └── database.ts   # Conexión MongoDB
├── models/           # Modelos Mongoose
│   ├── User.ts       # Modelo de Usuario
│   ├── Clase.ts      # Modelo de Clase
│   └── IMCRegistro.ts # Modelo de IMC
├── routes/           # Rutas Express
│   ├── auth.routes.ts
│   ├── user.routes.ts
│   ├── clase.routes.ts
│   └── health.routes.ts
├── controllers/      # Controladores
│   ├── auth.controller.ts
│   ├── user.controller.ts
│   ├── clase.controller.ts
│   └── health.controller.ts
├── middleware/       # Middleware
│   ├── auth.ts       # Autenticación JWT
│   ├── rateLimiter.ts
│   └── errorHandler.ts
├── scripts/          # Scripts utilitarios
│   └── seed.ts       # Seed de datos
└── server.ts         # Punto de entrada
```

## Instalación

```bash
npm install
```

## Configuración

El archivo `.env` ya está creado. Configura:

1. **MongoDB Atlas URI**:
   - Ver `/MONGODB_SETUP.md` para obtener tu URI
   - Reemplaza `XXXXX` en `MONGODB_URI` con tu cluster host

2. **JWT Secret**:
   - Genera uno seguro:
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

3. **Email** (opcional): Configura SMTP para OTP

## Desarrollo

```bash
npm run dev
```

Servidor en [http://localhost:3001](http://localhost:3001)

## Build

```bash
npm run build
npm start
```

## Seed de Datos

```bash
npm run seed
```

Crea:
- 3 usuarios (admin, docente, usuario)
- 5 clases de ejemplo

Credenciales:
- Admin: `admin@saludfabi.com` / `password123`
- Docente: `docente@saludfabi.com` / `password123`
- Usuario: `usuario@saludfabi.com` / `password123`

## Endpoints API

### Autenticación
- `POST /api/auth/register` - Registro
- `POST /api/auth/login` - Login
- `POST /api/auth/webauthn/register-options` - WebAuthn registro
- `POST /api/auth/webauthn/register-verify` - Verificar registro
- `POST /api/auth/webauthn/login-options` - WebAuthn login
- `POST /api/auth/webauthn/login-verify` - Verificar login

### Usuarios
- `GET /api/users/profile` - Perfil (autenticado)
- `PUT /api/users/profile` - Actualizar perfil (autenticado)
- `GET /api/users` - Listar usuarios (admin)
- `DELETE /api/users/:id` - Eliminar usuario (admin)

### Clases
- `GET /api/clases` - Listar clases públicas
- `GET /api/clases/:id` - Obtener clase
- `POST /api/clases` - Crear clase (docente/admin)
- `PUT /api/clases/:id` - Actualizar clase (docente/admin)
- `DELETE /api/clases/:id` - Eliminar clase (docente/admin)

### Salud
- `POST /api/health/imc/calcular` - Calcular IMC (autenticado)
- `GET /api/health/imc/historial` - Historial IMC (autenticado)
- `POST /api/health/predictor` - Predicción de enfermedades (autenticado)

## Modelos

### User
```typescript
{
  nombre: string
  email: string
  password: string (hashed)
  role: 'usuario' | 'docente' | 'admin'
  webauthnCredentials: Array
  profile: {
    edad?: number
    genero?: string
    telefono?: string
    ciudad?: string
    provincia?: string
  }
}
```

### Clase
```typescript
{
  titulo: string
  descripcion: string
  autorId: ObjectId
  tipo: 'video' | 'pdf' | 'articulo'
  mediaUrl?: string
  tags: string[]
  categoria: string
  visibility: 'publica' | 'privada'
}
```

### IMCRegistro
```typescript
{
  userId: ObjectId
  pesoKg: number
  alturaCm: number
  imc: number
  categoria: string
  recomendaciones: string[]
  fecha: Date
}
```

## Seguridad

- Helmet para headers de seguridad
- CORS configurado
- Rate limiting (100 req/15min)
- JWT con expiración
- Passwords hasheados con bcrypt
- Validación de inputs
- MongoDB injection protection

## Testing

```bash
npm test
```

## Despliegue

Ver `/DEPLOYMENT_GUIDE.md` para instrucciones de despliegue en Railway.

## Environment Variables

Ver `.env.example` para lista completa.

Variables críticas:
- `MONGODB_URI` - Conexión a MongoDB Atlas
- `JWT_SECRET` - Secret para JWT (min 32 chars)
- `FRONTEND_URL` - URL del frontend para CORS
- `ML_SERVICE_URL` - URL del servicio ML

## Soporte

Ver README principal en la raíz del proyecto.
