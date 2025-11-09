/**
 * Dashboard - Pantalla de bienvenida con pasos para usar la plataforma
 */

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useAuthStore } from '@/store/authStore';

export default function DashboardPage() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return null;

  const features = [
    { title: 'Clases Educativas', description: 'Explora videos y materiales sobre salud', link: '/clases', icon: '📚', color: 'bg-blue-500' },
    { title: 'Calculadora IMC', description: 'Calcula tu índice de masa corporal', link: '/imc', icon: '⚖️', color: 'bg-green-500' },
    { title: 'Predictor de Salud', description: 'Orientación sobre síntomas', link: '/predictor', icon: '🩺', color: 'bg-purple-500' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main id="main-content" className="flex-1 py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Bienvenido/a, {user?.nombre}
            </h1>
            <p className="text-xl text-gray-700">¿Qué te gustaría hacer hoy?</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {features.map((feature) => (
              <Link key={feature.link} href={feature.link} className="no-underline">
                <Card hover className="h-full text-center">
                  <div className={`text-5xl w-20 h-20 rounded-full ${feature.color} text-white flex items-center justify-center mx-auto mb-4`}>
                    {feature.icon}
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">{feature.title}</h2>
                  <p className="text-lg text-gray-700 mb-4">{feature.description}</p>
                  <Button variant="outline" size="md">Acceder</Button>
                </Card>
              </Link>
            ))}
          </div>

          {user?.role === 'docente' && (
            <Card className="bg-primary-50">
              <h2 className="text-2xl font-bold mb-4">Panel de Docente</h2>
              <Link href="/docente/clases">
                <Button variant="primary">Gestionar Mis Clases</Button>
              </Link>
            </Card>
          )}

          {user?.role === 'admin' && (
            <Card className="bg-purple-50">
              <h2 className="text-2xl font-bold mb-4">Panel de Administrador</h2>
              <Link href="/admin">
                <Button variant="primary">Ir a Administración</Button>
              </Link>
            </Card>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
