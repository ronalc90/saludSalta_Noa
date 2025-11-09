# Guía de Despliegue - SaludSalta NOA

## Servicios a Desplegar

1. **Disease Predictor** (Python/FastAPI) → Railway
2. **Backend** (Node.js/Express) → Railway
3. **Frontend** (Next.js) → Vercel

---

## 1. Desplegar Disease Predictor en Railway

### Paso 1: Preparar el repositorio

```bash
cd disease-predictor
git init
git add .
git commit -m "Initial commit: Disease Predictor API"
```

### Paso 2: Crear repositorio en GitHub

1. Ve a GitHub y crea un nuevo repositorio llamado `saludsalta-disease-predictor`
2. Sube el código:

```bash
git remote add origin https://github.com/ronalc90/saludsalta-disease-predictor.git
git branch -M main
git push -u origin main
```

### Paso 3: Desplegar en Railway

1. Ve a [Railway.app](https://railway.app/)
2. Inicia sesión con GitHub
3. Click en "New Project"
4. Selecciona "Deploy from GitHub repo"
5. Elige `saludsalta-disease-predictor`
6. Railway detectará automáticamente Python y el Procfile
7. Espera a que termine el despliegue (5-10 minutos)
8. Obtén la URL pública (ej: `https://saludsalta-disease-predictor-production.up.railway.app`)

### Paso 4: Probar el servicio

Abre en el navegador:
```
https://TU-URL.railway.app/health
```

Deberías ver:
```json
{
  "status": "healthy",
  "model_loaded": true,
  "symptoms_count": 132
}
```

---

## 2. Desplegar Backend en Railway

### Paso 1: Configurar variables de entorno en Railway

Después de desplegar el backend en Railway, configura estas variables:

```
NODE_ENV=production
PORT=3001
FRONTEND_URL=https://tu-app.vercel.app
MONGODB_URI=mongodb+srv://fabiproyecto:roPAh6QTV9rZktwJ@freelanceseguro-cluster.mongodb.net/fabi_bd?retryWrites=true&w=majority
JWT_SECRET=tu-super-secreto-jwt-key-cambiar-en-produccion-min-32-caracteres
JWT_EXPIRES_IN=7d
WEBAUTHN_RP_NAME=Plataforma Salud Fabi
WEBAUTHN_RP_ID=tu-app.vercel.app
WEBAUTHN_ORIGIN=https://tu-app.vercel.app
```

---

## 3. Desplegar Frontend en Vercel

### Paso 1: Preparar el proyecto

1. Asegúrate de que el repositorio ya esté en GitHub (ya lo hiciste)
2. Ve a [Vercel](https://vercel.com/)
3. Inicia sesión con GitHub
4. Click en "New Project"
5. Importa el repositorio `saludSalta_Noa`

### Paso 2: Configuración del proyecto

1. **Root Directory**: `frontend`
2. **Framework Preset**: Next.js
3. **Build Command**: `npm run build`
4. **Output Directory**: `.next`

### Paso 3: Variables de entorno

Agrega estas variables de entorno en Vercel:

```
NEXT_PUBLIC_API_URL=https://tu-backend.railway.app
NEXT_PUBLIC_DISEASE_PREDICTOR_URL=https://saludsalta-disease-predictor-production.up.railway.app
NEXT_PUBLIC_ML_URL=https://tu-ml-service.railway.app
NEXT_PUBLIC_APP_NAME=Plataforma Salud Fabi
```

### Paso 4: Desplegar

1. Click en "Deploy"
2. Espera 2-5 minutos
3. Vercel te dará una URL pública

---

## 4. Configuración Post-Despliegue

### Actualizar variables de entorno

1. **En Railway (Backend)**: Actualiza `FRONTEND_URL` con la URL de Vercel
2. **En Railway (Backend)**: Actualiza `WEBAUTHN_RP_ID` y `WEBAUTHN_ORIGIN`
3. **En Vercel (Frontend)**: Asegúrate que `NEXT_PUBLIC_API_URL` apunte al backend de Railway
4. **En Vercel (Frontend)**: Asegúrate que `NEXT_PUBLIC_DISEASE_PREDICTOR_URL` apunte al predictor de Railway

### Ejemplo de URLs finales:

- **Frontend**: `https://salud-salta.vercel.app`
- **Backend**: `https://saludsalta-backend.up.railway.app`
- **Disease Predictor**: `https://saludsalta-disease-predictor.up.railway.app`

---

## 5. Probar el Sistema Completo

### Test 1: Health Checks

```bash
# Frontend
curl https://salud-salta.vercel.app/

# Backend
curl https://saludsalta-backend.up.railway.app/api/health

# Disease Predictor
curl https://saludsalta-disease-predictor.up.railway.app/health
```

### Test 2: Predictor de Enfermedades

1. Abre `https://salud-salta.vercel.app/predictor`
2. Selecciona algunos síntomas
3. Acepta el consentimiento
4. Click en "Obtener Orientación"
5. Deberías ver los resultados de la predicción

---

## 6. Monitoreo y Logs

### Railway Logs

1. Ve al dashboard de Railway
2. Selecciona tu servicio
3. Ve a la pestaña "Logs"
4. Aquí verás los logs en tiempo real

### Vercel Logs

1. Ve al dashboard de Vercel
2. Selecciona tu proyecto
3. Ve a la pestaña "Deployments"
4. Click en el deployment activo
5. Ve a "Functions" para ver logs

---

## 7. Troubleshooting

### El predictor no carga

- Verifica que Railway haya desplegado correctamente
- Verifica los logs de Railway para errores
- Asegúrate que la variable `NEXT_PUBLIC_DISEASE_PREDICTOR_URL` esté correcta en Vercel

### CORS errors

- En Railway (Backend), asegúrate que `FRONTEND_URL` coincida con tu URL de Vercel
- En el servicio de Python, el CORS está configurado para permitir todos los orígenes

### MongoDB connection errors

- Verifica que la IP de Railway esté permitida en MongoDB Atlas (o permite todas: 0.0.0.0/0)
- Verifica que `MONGODB_URI` esté correctamente configurada

---

## 8. Costos Estimados

- **Railway**: $5/mes por servicio (Free tier: 500 horas/mes)
- **Vercel**: Gratis para proyectos personales
- **MongoDB Atlas**: Gratis (tier M0)

**Total estimado**: $0-10/mes dependiendo del uso

---

## Resumen de Comandos Rápidos

```bash
# 1. Subir Disease Predictor a GitHub
cd disease-predictor
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/ronalc90/saludsalta-disease-predictor.git
git push -u origin main

# 2. El resto se hace desde las interfaces web de Railway y Vercel
```
