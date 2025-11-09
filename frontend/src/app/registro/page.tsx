/**
 * Página de Registro
 * Formulario accesible para crear cuenta
 */

'use client';

export const dynamic = 'force-dynamic';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Alert } from '@/components/ui/Alert';
import { Card } from '@/components/ui/Card';
import { AutoFaceCapture } from '@/components/auth/AutoFaceCapture';
import apiClient from '@/lib/api';
import { useAuthStore } from '@/store/authStore';
import type { AuthResponse } from '@/types';

export default function RegistroPage() {
  const router = useRouter();
  const { setAuth } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showFaceCapture, setShowFaceCapture] = useState(false);
  const [faceImages, setFaceImages] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    cedula: '',
    role: 'usuario' as 'usuario' | 'docente',
    password: '',
    confirmPassword: '',
    consentimiento: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = 'checked' in e.target ? e.target.checked : false;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleStartFaceCapture = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validaciones
    if (!formData.nombre || !formData.email || !formData.cedula) {
      setError('Por favor complete todos los campos');
      return;
    }

    // Validar contraseña solo para docentes
    if (formData.role === 'docente') {
      if (!formData.password) {
        setError('Los docentes deben ingresar una contraseña');
        return;
      }
      if (formData.password.length < 6) {
        setError('La contraseña debe tener al menos 6 caracteres');
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setError('Las contraseñas no coinciden');
        return;
      }
    }

    if (!formData.consentimiento) {
      setError('Debe aceptar los términos y el uso de datos');
      return;
    }

    // Abrir captura facial
    setShowFaceCapture(true);
  };

  const handleFaceCaptured = async (images: string[]) => {
    setShowFaceCapture(false);
    setFaceImages(images);
    setLoading(true);
    setSuccess('Procesando registro facial...');

    try {
      // Registrar usuario con datos faciales
      const { data } = await apiClient.post<AuthResponse>('/auth/register', {
        nombre: formData.nombre,
        email: formData.email,
        cedula: formData.cedula,
        role: formData.role,
        // Si es docente, usar su contraseña. Si es usuario normal, generar una temporal
        password: formData.role === 'docente'
          ? formData.password
          : Math.random().toString(36).slice(-12),
        consentimiento: formData.consentimiento,
        faceData: images, // Enviar imágenes faciales
      });

      setAuth(data.user, data.token);
      setSuccess('¡Cuenta creada exitosamente con reconocimiento facial!');

      setTimeout(() => {
        router.push('/dashboard');
      }, 1500);
    } catch (err: any) {
      setError(err.message || 'Error al crear la cuenta. Intente nuevamente.');
      setFaceImages([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main id="main-content" className="flex-1 py-12 bg-gray-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <h1 className="text-3xl font-bold text-center text-gray-900 mb-2">
              Crear Cuenta
            </h1>
            <p className="text-center text-lg text-gray-600 mb-8">
              Regístrate para acceder a todos los recursos de salud
            </p>

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

            <div className="bg-gradient-to-br from-blue-50 to-primary-50 border-2 border-primary-300 rounded-2xl p-6 mb-6">
              <div className="flex gap-4 items-start">
                <div className="text-5xl">😊</div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Registro con Reconocimiento Facial
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    En esta plataforma usamos reconocimiento facial para tu seguridad.
                    Después de completar el formulario, te pediremos tomar unas fotos de tu rostro
                    desde diferentes ángulos. ¡Es rápido y seguro!
                  </p>
                </div>
              </div>
            </div>

            <form onSubmit={handleStartFaceCapture} className="space-y-6">
              <div>
                <label htmlFor="role" className="block text-base font-semibold text-gray-900 mb-2">
                  Tipo de Usuario
                </label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  required
                >
                  <option value="usuario">👤 Usuario Regular (Solo Biométrico)</option>
                  <option value="docente">👨‍🏫 Docente (Contraseña + Biométrico)</option>
                </select>
                <p className="mt-2 text-sm text-gray-600">
                  {formData.role === 'usuario'
                    ? 'Los usuarios regulares solo necesitan reconocimiento facial para acceder'
                    : 'Los docentes requieren contraseña además del reconocimiento facial'}
                </p>
              </div>

              <Input
                label="Nombre Completo"
                name="nombre"
                type="text"
                value={formData.nombre}
                onChange={handleChange}
                placeholder="Ej: María González"
                required
                autoComplete="name"
              />

              <Input
                label="Correo Electrónico"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="ejemplo@correo.com"
                required
                autoComplete="email"
              />

              <Input
                label="Número de Cédula / DNI"
                name="cedula"
                type="text"
                value={formData.cedula}
                onChange={handleChange}
                placeholder="12345678"
                required
                helperText="Número de identificación personal"
              />

              {/* Campos de contraseña - solo para docentes */}
              {formData.role === 'docente' && (
                <>
                  <Input
                    label="Contraseña"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Mínimo 6 caracteres"
                    required
                    autoComplete="new-password"
                    helperText="Los docentes necesitan contraseña además del reconocimiento facial"
                  />

                  <Input
                    label="Confirmar Contraseña"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Repite tu contraseña"
                    required
                    autoComplete="new-password"
                  />
                </>
              )}

              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="consentimiento"
                  name="consentimiento"
                  checked={formData.consentimiento}
                  onChange={handleChange}
                  className="w-6 h-6 mt-1 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  required
                />
                <label htmlFor="consentimiento" className="text-base text-gray-700">
                  Acepto los <Link href="/terminos" className="text-primary-600 hover:text-primary-700">términos de uso</Link> y la{' '}
                  <Link href="/privacidad" className="text-primary-600 hover:text-primary-700">política de privacidad</Link>.
                  Entiendo que esta plataforma proporciona información orientativa y no reemplaza la atención médica profesional.
                </label>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                loading={loading}
                className="w-full"
              >
                📸 Continuar al Registro Facial
              </Button>
            </form>

            {/* Modal de captura facial automática */}
            {showFaceCapture && (
              <AutoFaceCapture
                onCapture={handleFaceCaptured}
                onCancel={() => setShowFaceCapture(false)}
                captureCount={4}
              />
            )}

            <p className="mt-6 text-center text-lg text-gray-600">
              ¿Ya tienes cuenta?{' '}
              <Link href="/login" className="text-primary-600 hover:text-primary-700 font-semibold">
                Inicia sesión aquí
              </Link>
            </p>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
