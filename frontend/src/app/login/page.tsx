/**
 * Página de Login
 * Soporta WebAuthn + fallback a password/OTP
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
import { AutoFaceLogin } from '@/components/auth/AutoFaceLogin';
import apiClient from '@/lib/api';
import { useAuthStore } from '@/store/authStore';
import type { AuthResponse } from '@/types';

export default function LoginPage() {
  const router = useRouter();
  const { setAuth } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showFaceLogin, setShowFaceLogin] = useState(false);
  const [loginMode, setLoginMode] = useState<'usuario' | 'docente'>('usuario');
  const [cedula, setCedula] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Por favor complete todos los campos');
      return;
    }

    setLoading(true);

    try {
      const { data } = await apiClient.post<AuthResponse>('/auth/login', {
        email,
        password,
      });

      setAuth(data.user, data.token);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Credenciales inválidas');
    } finally {
      setLoading(false);
    }
  };

  const handleStartFaceLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!cedula) {
      setError('Por favor ingrese su número de cédula');
      return;
    }

    // Si es docente y no tiene contraseña, mostrar error
    if (loginMode === 'docente' && !password) {
      setError('Los docentes deben ingresar su contraseña además del reconocimiento facial');
      return;
    }

    setShowFaceLogin(true);
  };

  const handleFaceCaptured = async (faceData: string) => {
    setShowFaceLogin(false);
    setLoading(true);

    try {
      const { data } = await apiClient.post<AuthResponse>('/auth/face-login', {
        cedula,
        faceData,
        password: loginMode === 'docente' ? password : undefined,
      });

      setAuth(data.user, data.token);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'No se pudo verificar tu identidad. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main id="main-content" className="flex-1 py-12 bg-gray-50">
        <div className="max-w-md mx-auto px-4">
          <Card>
            <h1 className="text-3xl font-bold text-center mb-6">Iniciar Sesión</h1>

            {error && <Alert variant="error" className="mb-6">{error}</Alert>}

            {/* Selector de tipo de usuario */}
            <div className="flex gap-2 mb-6">
              <button
                type="button"
                onClick={() => setLoginMode('usuario')}
                className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
                  loginMode === 'usuario'
                    ? 'bg-primary-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                👤 Usuario
              </button>
              <button
                type="button"
                onClick={() => setLoginMode('docente')}
                className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
                  loginMode === 'docente'
                    ? 'bg-primary-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                👨‍🏫 Docente
              </button>
            </div>

            {loginMode === 'usuario' ? (
              <>
                <div className="bg-gradient-to-br from-blue-50 to-primary-50 border-2 border-primary-300 rounded-2xl p-6 mb-6">
                  <div className="flex gap-4 items-start">
                    <div className="text-5xl">🔐</div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        Ingreso con Reconocimiento Facial
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        Ingresa tu cédula y verifica tu identidad con tu rostro.
                        <strong className="block mt-1 text-primary-700">
                          Rápido y seguro.
                        </strong>
                      </p>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleStartFaceLogin} className="space-y-6">
              <Input
                label="Número de Cédula / DNI"
                type="text"
                value={cedula}
                onChange={(e) => setCedula(e.target.value)}
                placeholder="12345678"
                required
                helperText="Tu número de identificación personal"
              />

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full text-xl py-6"
                    loading={loading}
                  >
                    📸 Verificar con mi Rostro
                  </Button>
                </form>

                <div className="mt-6 p-4 bg-amber-50 border-2 border-amber-200 rounded-xl">
                  <p className="text-sm text-gray-700 text-center">
                    💡 <strong>Consejo:</strong> La cámara se activará automáticamente cuando detecte buena iluminación.
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="bg-gradient-to-br from-purple-50 to-indigo-50 border-2 border-purple-300 rounded-2xl p-6 mb-6">
                  <div className="flex gap-4 items-start">
                    <div className="text-5xl">👨‍🏫</div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        Ingreso para Docentes
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        Doble autenticación: Contraseña + Reconocimiento Facial.
                        <strong className="block mt-1 text-purple-700">
                          Máxima seguridad para tu cuenta.
                        </strong>
                      </p>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleStartFaceLogin} className="space-y-6">
                  <Input
                    label="Número de Cédula / DNI"
                    type="text"
                    value={cedula}
                    onChange={(e) => setCedula(e.target.value)}
                    placeholder="12345678"
                    required
                    helperText="Tu número de identificación personal"
                  />

                  <Input
                    label="Contraseña"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    helperText="Tu contraseña de docente"
                  />

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full text-xl py-6"
                    loading={loading}
                  >
                    🔐 Verificar Contraseña + Rostro
                  </Button>
                </form>

                <div className="mt-6">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white text-gray-500">o también puedes</span>
                    </div>
                  </div>

                  <form onSubmit={handlePasswordLogin} className="mt-6 space-y-4">
                    <Input
                      label="Email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="tu@email.com"
                    />

                    <Input
                      label="Contraseña"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                    />

                    <Button
                      type="submit"
                      variant="outline"
                      size="md"
                      className="w-full"
                      loading={loading}
                    >
                      Ingresar solo con Contraseña
                    </Button>
                  </form>
                </div>
              </>
            )}

            {/* Modal de login facial automático */}
            {showFaceLogin && (
              <AutoFaceLogin
                onCapture={handleFaceCaptured}
                onCancel={() => setShowFaceLogin(false)}
              />
            )}

            <p className="mt-6 text-center text-lg">
              ¿No tienes cuenta?{' '}
              <Link href="/registro" className="text-primary-600 hover:text-primary-700 font-semibold">
                Regístrate aquí
              </Link>
            </p>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
