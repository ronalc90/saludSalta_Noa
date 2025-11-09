/**
 * Cliente API con Axios
 * Configura interceptores para autenticación y manejo de errores
 */

import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import type { ApiError } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
const ML_URL = process.env.NEXT_PUBLIC_ML_URL || 'http://localhost:8001';

// Cliente para API principal
export const apiClient = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

// Cliente para servicio ML
export const mlClient = axios.create({
  baseURL: ML_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 60000,
});

// Interceptor para agregar token a las peticiones
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (typeof window !== 'undefined') {
      const authStorage = localStorage.getItem('fabi-auth-storage');
      console.log('Auth storage:', authStorage);
      if (authStorage) {
        try {
          const { state } = JSON.parse(authStorage);
          console.log('Parsed state:', state);
          if (state?.token) {
            config.headers.Authorization = `Bearer ${state.token}`;
            console.log('Token agregado al header:', state.token.substring(0, 20) + '...');
          } else {
            console.log('No hay token en el state');
          }
        } catch (error) {
          console.error('Error parsing auth storage:', error);
        }
      } else {
        console.log('No hay auth storage en localStorage');
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor para manejo de errores
const handleError = (error: AxiosError<ApiError>) => {
  if (error.response) {
    console.log('Error response:', error.response.status, error.response.data);
    // Error de respuesta del servidor
    const apiError: ApiError = {
      message: error.response.data?.message || 'Error en la solicitud',
      statusCode: error.response.status,
      errors: error.response.data?.errors,
    };

    // Si es 401, limpiar autenticación
    if (error.response.status === 401) {
      console.log('Error 401 - Redirigiendo a login');
      if (typeof window !== 'undefined') {
        localStorage.removeItem('fabi-auth-storage');
        window.location.href = '/login';
      }
    }

    return Promise.reject(apiError);
  } else if (error.request) {
    // Error de red
    return Promise.reject({
      message: 'Error de conexión. Verifique su internet.',
      statusCode: 0,
    } as ApiError);
  } else {
    // Otro error
    return Promise.reject({
      message: error.message || 'Error desconocido',
      statusCode: 0,
    } as ApiError);
  }
};

apiClient.interceptors.response.use(
  (response) => response,
  handleError
);

mlClient.interceptors.response.use(
  (response) => response,
  handleError
);

export default apiClient;
