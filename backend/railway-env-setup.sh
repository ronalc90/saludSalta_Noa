#!/bin/bash
# Script para configurar variables de entorno en Railway
# Ejecuta: railway variables set [VARIABLE]=[VALOR]

railway variables set NODE_ENV=production
railway variables set PORT=3001
railway variables set FRONTEND_URL=https://www.saludadultomayor.org
railway variables set MONGODB_URI="mongodb+srv://fabiproyecto:roPAh6QTV9rZktwJ@freelanceseguro-cluster.h8arfec.mongodb.net/fabi_bd?retryWrites=true&w=majority"
railway variables set JWT_SECRET="fabi-super-secret-jwt-key-change-in-production-minimum-32-characters"
railway variables set JWT_EXPIRES_IN=7d
railway variables set WEBAUTHN_RP_NAME="Salud Para Salta y NOA"
railway variables set WEBAUTHN_RP_ID=www.saludadultomayor.org
railway variables set WEBAUTHN_ORIGIN=https://www.saludadultomayor.org
railway variables set ML_SERVICE_URL=https://saludsalta-disease-predictor-production.up.railway.app
railway variables set RATE_LIMIT_WINDOW_MS=900000
railway variables set RATE_LIMIT_MAX_REQUESTS=100

echo "✅ Variables de entorno configuradas en Railway"
