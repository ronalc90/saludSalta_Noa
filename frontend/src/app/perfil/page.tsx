/**
 * Página de Perfil de Usuario
 * Permite actualizar contraseña e identificación facial
 */

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Alert } from '@/components/ui/Alert';
import { AutoFaceCapture } from '@/components/auth/AutoFaceCapture';
import { apiClient } from '@/lib/api';
import * as faceapi from '@vladmandic/face-api';

export default function PerfilPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [showFaceCapture, setShowFaceCapture] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Formulario de contraseña
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    setLoading(true);

    try {
      await apiClient.post('/auth/change-password', {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });

      setSuccess('Contraseña actualizada exitosamente');
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
      setShowPasswordForm(false);
    } catch (err: any) {
      setError(err.message || 'Error al cambiar la contraseña');
    } finally {
      setLoading(false);
    }
  };

  const handleFaceCapture = async (faceData: string[]) => {
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      // Cargar modelos de face-api si no están cargados
      const MODEL_URL = '/models';
      if (!faceapi.nets.faceRecognitionNet.isLoaded) {
        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
          faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
          faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        ]);
      }

      // Extraer descriptores faciales de las imágenes
      const descriptors: number[][] = [];
      for (const imageData of faceData) {
        const img = await faceapi.fetchImage(imageData);
        const detection = await faceapi
          .detectSingleFace(img, new faceapi.TinyFaceDetectorOptions())
          .withFaceLandmarks()
          .withFaceDescriptor();

        if (detection && detection.descriptor) {
          descriptors.push(Array.from(detection.descriptor));
        }
      }

      if (descriptors.length === 0) {
        throw new Error('No se pudieron extraer descriptores faciales de las imágenes');
      }

      await apiClient.post('/auth/update-face', {
        faceImages: faceData,
        faceDescriptors: descriptors,
      });

      setSuccess('Identificación facial actualizada exitosamente');
      setShowFaceCapture(false);
    } catch (err: any) {
      setError(err.message || 'Error al actualizar la identificación facial');
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated || !user) {
    return null;
  }

  // Verificar si tiene reconocimiento facial (si el array existe y tiene elementos, o si está definido como array vacío)
  const hasFaceAuth = user.faceDescriptors !== undefined && user.faceDescriptors !== null;
  // Verificar si tiene contraseña configurada
  const hasPassword = user.password === true;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-gradient-to-br from-blue-50 to-green-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Mi Perfil</h1>

        {error && (
          <Alert variant="error" className="mb-6">
            {error}
          </Alert>
        )}

        {success && (
          <Alert variant="success" className="mb-6">
            {success}
          </Alert>
        )}

        {/* Información del usuario */}
        <Card className="p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Información Personal
          </h2>
          <div className="space-y-3 text-gray-700">
            <div className="flex justify-between">
              <span className="font-medium">Nombre:</span>
              <span>{user.nombre}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Email:</span>
              <span>{user.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Cédula:</span>
              <span>{user.cedula}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Rol:</span>
              <span className="capitalize">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  user.role === 'docente'
                    ? 'bg-purple-100 text-purple-700'
                    : user.role === 'admin'
                    ? 'bg-red-100 text-red-700'
                    : 'bg-blue-100 text-blue-700'
                }`}>
                  {user.role === 'docente' ? '👨‍🏫 Docente' : user.role === 'admin' ? '⚡ Administrador' : '👤 Usuario'}
                </span>
              </span>
            </div>
          </div>
        </Card>

        {/* Panel para docentes */}
        {user.role === 'docente' && (
          <Card className="p-6 mb-6 bg-gradient-to-br from-purple-50 to-indigo-50">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              🎓 Panel de Docente
            </h2>
            <p className="text-gray-700 mb-4">
              Como docente, tienes acceso a funcionalidades adicionales para gestionar tus clases y ver estadísticas.
            </p>
            <div className="flex gap-3">
              <Link href="/docente/mis-clases">
                <Button variant="primary">
                  Gestionar Mis Clases
                </Button>
              </Link>
              <Link href="/docente/estadisticas">
                <Button variant="outline">
                  Ver Estadísticas
                </Button>
              </Link>
            </div>
          </Card>
        )}

        {/* Seguridad */}
        <Card className="p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Seguridad
          </h2>

          <div className="space-y-4">
            {/* Contraseña */}
            {hasPassword && (
              <div className="border-b pb-4">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <h3 className="font-medium text-gray-900">Contraseña</h3>
                    <p className="text-sm text-gray-600">
                      Última actualización: Hace tiempo
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowPasswordForm(!showPasswordForm)}
                  >
                    {showPasswordForm ? 'Cancelar' : 'Cambiar'}
                  </Button>
                </div>

                {showPasswordForm && (
                  <form onSubmit={handlePasswordChange} className="mt-4 space-y-4">
                    <Input
                      type="password"
                      label="Contraseña Actual"
                      value={passwordData.currentPassword}
                      onChange={(e) =>
                        setPasswordData({
                          ...passwordData,
                          currentPassword: e.target.value,
                        })
                      }
                      required
                    />
                    <Input
                      type="password"
                      label="Nueva Contraseña"
                      value={passwordData.newPassword}
                      onChange={(e) =>
                        setPasswordData({
                          ...passwordData,
                          newPassword: e.target.value,
                        })
                      }
                      required
                      minLength={6}
                    />
                    <Input
                      type="password"
                      label="Confirmar Nueva Contraseña"
                      value={passwordData.confirmPassword}
                      onChange={(e) =>
                        setPasswordData({
                          ...passwordData,
                          confirmPassword: e.target.value,
                        })
                      }
                      required
                      minLength={6}
                    />
                    <Button
                      type="submit"
                      variant="primary"
                      className="w-full"
                      disabled={loading}
                    >
                      {loading ? 'Actualizando...' : 'Actualizar Contraseña'}
                    </Button>
                  </form>
                )}
              </div>
            )}

            {/* Identificación Facial */}
            <div className="pt-4">
              <div className="flex justify-between items-center mb-2">
                <div>
                  <h3 className="font-medium text-gray-900">
                    Identificación Facial
                  </h3>
                  <p className="text-sm text-gray-600">
                    {hasFaceAuth
                      ? 'Configurada y activa'
                      : 'No configurada'}
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowFaceCapture(!showFaceCapture)}
                >
                  {showFaceCapture
                    ? 'Cancelar'
                    : hasFaceAuth
                    ? 'Actualizar'
                    : 'Configurar'}
                </Button>
              </div>

              {showFaceCapture && (
                <div className="mt-4">
                  <AutoFaceCapture
                    onCapture={handleFaceCapture}
                    onCancel={() => setShowFaceCapture(false)}
                    captureCount={4}
                  />
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* Información adicional */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Métodos de Autenticación
          </h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🔑</span>
                <div>
                  <p className="font-medium">Contraseña</p>
                  <p className="text-sm text-gray-600">
                    {hasPassword ? 'Activa' : 'No configurada'}
                  </p>
                </div>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  hasPassword
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {hasPassword ? 'Activa' : 'Inactiva'}
              </span>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <span className="text-2xl">👤</span>
                <div>
                  <p className="font-medium">Reconocimiento Facial</p>
                  <p className="text-sm text-gray-600">
                    {hasFaceAuth ? 'Activo' : 'No configurado'}
                  </p>
                </div>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  hasFaceAuth
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {hasFaceAuth ? 'Activo' : 'Inactivo'}
              </span>
            </div>
          </div>
        </Card>
      </div>
    </main>
    <Footer />
    </div>
  );
}
