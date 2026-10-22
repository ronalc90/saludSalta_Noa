#!/bin/bash
# Script para configurar variables de entorno en Railway
# Ejecuta: railway variables set [VARIABLE]=[VALOR]
#
# Los secretos NO van en este archivo (el repositorio es público). Defínelos
# en tu terminal antes de correrlo:
#   export MONGODB_URI="mongodb+srv://<usuario>:<contraseña>@<cluster>.mongodb.net/fabi_bd?retryWrites=true&w=majority"
#   export JWT_SECRET="$(openssl rand -base64 48)"

set -euo pipefail
: "${MONGODB_URI:?Define MONGODB_URI antes de correr el script}"
: "${JWT_SECRET:?Define JWT_SECRET antes de correr el script}"

railway variables set NODE_ENV=production
railway variables set PORT=3001
railway variables set FRONTEND_URL=https://www.saludadultomayor.org
railway variables set MONGODB_URI="$MONGODB_URI"
railway variables set JWT_SECRET="$JWT_SECRET"
railway variables set JWT_EXPIRES_IN=7d
railway variables set WEBAUTHN_RP_NAME="Salud Para Salta y NOA"
railway variables set WEBAUTHN_RP_ID=www.saludadultomayor.org
railway variables set WEBAUTHN_ORIGIN=https://www.saludadultomayor.org
railway variables set ML_SERVICE_URL=https://saludsalta-disease-predictor-production.up.railway.app
railway variables set RATE_LIMIT_WINDOW_MS=900000
railway variables set RATE_LIMIT_MAX_REQUESTS=100

echo "✅ Variables de entorno configuradas en Railway"
