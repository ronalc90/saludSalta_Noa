# Plataforma Salud Fabi 🏥

Plataforma web full-stack accesible para salud dirigida a personas mayores y con baja habilidad tecnológica en Salta y NOA.

## 📋 Tabla de Contenidos

- [Descripción](#descripción)
- [Características](#características)
- [Arquitectura](#arquitectura)
- [Requisitos Previos](#requisitos-previos)
- [Instalación Local](#instalación-local)
- [Desarrollo](#desarrollo)
- [Despliegue en Producción](#despliegue-en-producción)
- [Variables de Entorno](#variables-de-entorno)
- [Datos de Prueba](#datos-de-prueba)
- [Testing](#testing)
- [Principios Éticos](#principios-éticos)

## 📖 Descripción

Plataforma Salud Fabi es una solución completa de salud digital que proporciona:

- **Clases Educativas**: Videos y materiales sobre salud, nutrición y bienestar
- **Calculadora IMC**: Cálculo de Índice de Masa Corporal con recomendaciones personalizadas
- **Predictor de Enfermedades**: Orientación basada en síntomas (ML) - **NO diagnóstico médico**
- **Diseño Accesible**: WCAG AA, textos grandes, alto contraste, navegación simple
- **Autenticación Segura**: WebAuthn/FIDO2 con fallback a contraseña/OTP

**⚠️ IMPORTANTE**: Esta plataforma proporciona información orientativa y educativa. **NO reemplaza la atención médica profesional**.

## ✨ Características

### Frontend (Next.js + TypeScript + Tailwind)
- ✅ Diseño responsivo móvil-first
- ✅ Accesibilidad WCAG AA
- ✅ Autenticación WebAuthn + fallback OTP
- ✅ Gestión de estado con Zustand
- ✅ Componentes reutilizables y accesibles

### Backend (Node.js + Express + MongoDB)
- ✅ REST API con TypeScript
- ✅ Autenticación JWT + WebAuthn
- ✅ Validación de datos con Zod
- ✅ Rate limiting y seguridad con Helmet
- ✅ MongoDB Atlas para persistencia

### ML Service (Python + FastAPI)
- ✅ Predictor de enfermedades orientativo
- ✅ API REST con FastAPI
- ✅ Datos sintéticos de ejemplo (reemplazar con datos reales)
- ✅ Disclaimer ético en todas las respuestas

## 🏗️ Arquitectura

```
┌─────────────────┐
│   Frontend      │
│   Next.js       │  ← Vercel
│   (Port 3000)   │
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│   Backend API   │
│   Express       │  ← Railway
│   (Port 3001)   │
└────────┬────────┘
         │
    ┌────┴────┐
    ↓         ↓
┌─────────┐  ┌──────────────┐
│ MongoDB │  │  ML Service  │
│ Atlas   │  │  FastAPI     │  ← Railway
│         │  │  (Port 8001) │
└─────────┘  └──────────────┘
```

## 🔧 Requisitos Previos

- **Node.js** 20.x o superior
- **npm** 10.x o superior
- **Python** 3.11 o superior
- **MongoDB** (Atlas recomendado para producción)
- **Docker** (opcional, para desarrollo local)

## 📥 Instalación Local

### 1. Clonar el repositorio

```bash
git clone <url-del-repositorio>
cd Proyecto\ fabi
```

### 2. Configurar variables de entorno

Copiar el archivo `.env.example` y crear archivos `.env` para cada servicio:

```bash
# Frontend
cp .env.example frontend/.env.local

# Backend
cp .env.example backend/.env

# ML Service
cp .env.example ml-service/.env
```

**Editar los archivos `.env` con tus configuraciones:**

#### `backend/.env`
```env
NODE_ENV=development
PORT=3001
FRONTEND_URL=http://localhost:3000

# MongoDB Atlas - IMPORTANTE: Reemplaza con tu cluster
MONGODB_URI=mongodb+srv://fabiproyecto:roPAh6QTV9rZktwJ@freelanceseguro-cluster.XXXXX.mongodb.net/fabi_bd?retryWrites=true&w=majority

# Obtén el host completo de tu cluster en MongoDB Atlas:
# 1. Ve a tu cluster en MongoDB Atlas
# 2. Click en "Connect" > "Connect your application"
# 3. Copia la URI y reemplaza XXXXX con tu host

JWT_SECRET=tu-secreto-jwt-seguro-min-32-caracteres
JWT_EXPIRES_IN=7d

# Email (configurar con tu SMTP)
EMAIL_SMTP_HOST=smtp.gmail.com
EMAIL_SMTP_PORT=587
EMAIL_SMTP_USER=tu-email@gmail.com
EMAIL_SMTP_PASS=tu-app-password

# WebAuthn
WEBAUTHN_RP_NAME=Plataforma Salud Fabi
WEBAUTHN_RP_ID=localhost
WEBAUTHN_ORIGIN=http://localhost:3000

ML_SERVICE_URL=http://localhost:8001
```

#### `frontend/.env.local`
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_ML_URL=http://localhost:8001
```

### 3. Instalar dependencias

#### Opción A: Instalación manual

```bash
# Frontend
cd frontend
npm install

# Backend
cd ../backend
npm install

# ML Service
cd ../ml-service
pip install -r requirements.txt
```

#### Opción B: Instalación con script root

```bash
npm run install:all
```

### 4. Inicializar base de datos con datos de prueba

```bash
cd backend
npm run seed
```

Esto creará usuarios de ejemplo:
- **Admin**: `admin@saludfabi.com` / `password123`
- **Docente**: `docente@saludfabi.com` / `password123`
- **Usuario**: `usuario@saludfabi.com` / `password123`

### 5. Ejecutar en desarrollo

#### Opción A: Con Docker Compose (recomendado)

```bash
docker-compose up
```

Servicios disponibles:
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001
- ML Service: http://localhost:8001
- MongoDB: localhost:27017

#### Opción B: Manualmente en terminales separadas

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev

# Terminal 3 - ML Service
cd ml-service
python -m uvicorn app.main:app --reload --port 8001
```

## 🚀 Despliegue en Producción

### 1. MongoDB Atlas

1. Crear cuenta en [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Crear cluster (Free tier disponible)
3. Configurar usuario de base de datos:
   - Username: `fabiproyecto`
   - Password: `roPAh6QTV9rZktwJ`
   - Cluster name: `freelanceseguro-cluster`
4. Whitelist IP: `0.0.0.0/0` (permitir todas - configurar mejor en producción)
5. Obtener connection string y actualizar `MONGODB_URI` en variables de entorno

### 2. Desplegar Frontend en Vercel

1. Instalar Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy desde el directorio frontend:
```bash
cd frontend
vercel
```

3. Configurar variables de entorno en Vercel Dashboard:
   - `NEXT_PUBLIC_API_URL`: URL de tu backend en Railway
   - `NEXT_PUBLIC_ML_URL`: URL de tu ML service en Railway

4. Para producción:
```bash
vercel --prod
```

### 3. Desplegar Backend en Railway

1. Crear cuenta en [Railway](https://railway.app)
2. Crear nuevo proyecto
3. Deploy desde GitHub o CLI:

```bash
# Opción A: Conectar repositorio de GitHub
# - Ve a Railway Dashboard
# - New Project > Deploy from GitHub
# - Selecciona el repositorio y carpeta "backend"

# Opción B: Railway CLI
cd backend
railway login
railway init
railway up
```

4. Configurar variables de entorno en Railway Dashboard:
   - `NODE_ENV=production`
   - `PORT=3001`
   - `MONGODB_URI=<tu-uri-de-mongodb-atlas>`
   - `JWT_SECRET=<secreto-seguro>`
   - `FRONTEND_URL=<url-de-vercel>`
   - `ML_SERVICE_URL=<url-ml-service-railway>`
   - Copiar todas las demás variables necesarias

5. Railway generará una URL pública para tu API

### 4. Desplegar ML Service en Railway

1. Crear otro servicio en Railway
2. Deploy:

```bash
cd ml-service
railway init
railway up
```

3. Configurar variables:
   - `ML_PORT=8001`

### 5. Configurar Dominio en Namecheap

1. Comprar dominio en [Namecheap](https://www.namecheap.com)

2. Configurar DNS en Namecheap:

**Para Frontend (Vercel):**
```
Type: CNAME
Host: @
Value: cname.vercel-dns.com
TTL: Automatic
```

**Para Backend API:**
```
Type: CNAME
Host: api
Value: <tu-proyecto>.up.railway.app
TTL: Automatic
```

**Para ML Service:**
```
Type: CNAME
Host: ml
Value: <tu-proyecto-ml>.up.railway.app
TTL: Automatic
```

3. En Vercel Dashboard:
   - Settings > Domains > Add Domain
   - Agregar tu dominio personalizado

4. Actualizar variables de entorno de producción:
   - `NEXT_PUBLIC_API_URL=https://api.tudominio.com`
   - `FRONTEND_URL=https://tudominio.com`
   - `WEBAUTHN_RP_ID=tudominio.com`
   - `WEBAUTHN_ORIGIN=https://tudominio.com`

### 6. Configurar HTTPS/SSL

- **Vercel**: SSL automático con Let's Encrypt
- **Railway**: SSL automático incluido
- **Namecheap**: Certificados disponibles (opcional si usas Vercel/Railway)

## 🔐 Variables de Entorno

### Frontend
| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | URL del backend API | `http://localhost:3001` |
| `NEXT_PUBLIC_ML_URL` | URL del servicio ML | `http://localhost:8001` |

### Backend
| Variable | Descripción | Requerido |
|----------|-------------|-----------|
| `NODE_ENV` | Entorno (development/production) | ✅ |
| `PORT` | Puerto del servidor | ✅ |
| `MONGODB_URI` | URI de MongoDB Atlas | ✅ |
| `JWT_SECRET` | Secreto para JWT (mín 32 caracteres) | ✅ |
| `JWT_EXPIRES_IN` | Tiempo de expiración JWT | ❌ |
| `FRONTEND_URL` | URL del frontend | ✅ |
| `ML_SERVICE_URL` | URL del servicio ML | ✅ |
| `EMAIL_SMTP_HOST` | Host SMTP para emails | ❌ |
| `EMAIL_SMTP_USER` | Usuario SMTP | ❌ |
| `EMAIL_SMTP_PASS` | Contraseña SMTP | ❌ |
| `WEBAUTHN_RP_NAME` | Nombre para WebAuthn | ❌ |
| `WEBAUTHN_RP_ID` | ID relying party WebAuthn | ✅ |
| `WEBAUTHN_ORIGIN` | Origin para WebAuthn | ✅ |

### ML Service
| Variable | Descripción | Requerido |
|----------|-------------|-----------|
| `ML_PORT` | Puerto del servicio | ❌ |
| `ML_LOG_LEVEL` | Nivel de logging | ❌ |

## 👥 Datos de Prueba

Después de ejecutar `npm run seed`:

### Usuarios de Prueba

| Rol | Email | Password |
|-----|-------|----------|
| Admin | admin@saludfabi.com | password123 |
| Docente | docente@saludfabi.com | password123 |
| Usuario | usuario@saludfabi.com | password123 |

### Funcionalidades por Rol

- **Usuario**: Ver clases, calcular IMC, usar predictor, editar perfil
- **Docente**: Todo lo anterior + crear/editar/eliminar clases propias
- **Admin**: Acceso completo + gestión de usuarios

## 🧪 Testing

### Frontend
```bash
cd frontend
npm test
```

### Backend
```bash
cd backend
npm test
```

## 🛡️ Principios Éticos

Esta plataforma se rige por los siguientes principios:

1. **No Reemplazo Médico**: Información orientativa, no diagnóstico
2. **Privacidad**: Datos de salud protegidos con máxima confidencialidad
3. **Accesibilidad**: Diseño inclusivo para personas mayores
4. **Transparencia**: Uso claro de datos y algoritmos
5. **Consentimiento Informado**: Usuario autoriza cada funcionalidad

### Disclaimer ML

El predictor de enfermedades usa datos sintéticos de ejemplo. **Para producción**:

1. Reemplazar `ml-service/app/predictor.py` con modelo entrenado con datos reales
2. Usar datasets validados de fuentes confiables (ej: datos abiertos de salud pública)
3. Validar con profesionales médicos
4. Realizar auditorías éticas del algoritmo

## 📝 Comandos Útiles

```bash
# Desarrollo con recarga automática
npm run dev

# Build para producción
npm run build

# Iniciar en producción
npm start

# Linting
npm run lint

# Tests
npm test

# Seed de base de datos
npm run seed

# Docker
docker-compose up
docker-compose down
```

## 🤝 Contribuir

Ver `CODE_OF_CONDUCT.md` para principios éticos y de contribución.

## 📄 Licencia

MIT License - Ver `LICENSE`

## 📧 Contacto

Para consultas: info@saludfabi.com

---

**Desarrollado con accesibilidad y ética en salud** ❤️

🩺 Esta plataforma NO reemplaza la atención médica profesional
