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
  const [cedula, setCedula] = useState('');

  const handleStartFaceLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!cedula) {
      setError('Por favor ingrese su número de cédula');
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
            <h1 className="text-3xl font-bold text-center mb-8">Iniciar Sesión</h1>

            {error && <Alert variant="error" className="mb-6">{error}</Alert>}

            <div className="bg-gradient-to-br from-blue-50 to-primary-50 border-2 border-primary-300 rounded-2xl p-6 mb-6">
              <div className="flex gap-4 items-start">
                <div className="text-5xl">🔐</div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Ingreso Seguro con Cédula + Rostro
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Ingresa tu cédula y verifica tu identidad con tu rostro.
                    <strong className="block mt-1 text-primary-700">
                      Doble verificación para mayor seguridad.
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
                💡 <strong>Consejo:</strong> La cámara se activará automáticamente y capturará tu rostro cuando detecte buena iluminación.
              </p>
            </div>

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
