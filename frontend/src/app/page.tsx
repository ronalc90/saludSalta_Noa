/**
 * Página de inicio (Home)
 * Pantalla de bienvenida con pasos para usar la plataforma
 */

'use client';

import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { useAuthStore } from '@/store/authStore';

export default function HomePage() {
  const { isAuthenticated } = useAuthStore();

  const features = [
    {
      title: 'Clases Educativas',
      description: 'Accede a videos y materiales educativos sobre salud, nutrición y bienestar adaptados para personas mayores.',
      icon: '📚',
      link: '/clases',
      color: 'bg-blue-100 text-blue-600',
    },
    {
      title: 'Calculadora IMC',
      description: 'Calcula tu Índice de Masa Corporal y obtén recomendaciones personalizadas de salud.',
      icon: '⚖️',
      link: '/imc',
      color: 'bg-green-100 text-green-600',
    },
    {
      title: 'Orientación en Salud',
      description: 'Recibe orientación sobre síntomas comunes y cuándo es importante consultar a un médico.',
      icon: '🩺',
      link: '/predictor',
      color: 'bg-purple-100 text-purple-600',
    },
  ];

  const steps = [
    {
      number: 1,
      title: 'Regístrate gratis',
      description: 'Crea tu cuenta en minutos de forma segura.',
    },
    {
      number: 2,
      title: 'Explora recursos',
      description: 'Accede a clases, calculadoras y herramientas de salud.',
    },
    {
      number: 3,
      title: 'Cuida tu salud',
      description: 'Recibe orientación y educación sobre tu bienestar.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main id="main-content" className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-emerald-700 text-white py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-lg">
              Salud Para Salta y NOA
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed drop-shadow">
              Tu aliado en salud. Recursos educativos accesibles diseñados
              especialmente para personas mayores y sus familias.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {!isAuthenticated ? (
                <>
                  <Link href="/registro">
                    <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                      Comenzar Ahora
                    </Button>
                  </Link>
                  <Link href="/sobre">
                    <Button variant="outline" size="lg" className="w-full sm:w-auto bg-white text-primary-700 hover:bg-gray-100">
                      Conocer Más
                    </Button>
                  </Link>
                </>
              ) : (
                <Link href="/dashboard">
                  <Button variant="secondary" size="lg">
                    Ir al Panel
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="section-title text-center mb-16 text-4xl">¿Qué Puedes Hacer?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {features.map((feature, index) => (
                <Link href={feature.link} key={index} className="no-underline">
                  <Card hover className="h-full text-center transform transition-transform hover:scale-105">
                    <div className={`text-6xl mb-6 w-24 h-24 rounded-2xl ${feature.color} flex items-center justify-center mx-auto shadow-lg`}>
                      {feature.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      {feature.title}
                    </h3>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      {feature.description}
                    </p>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Steps Section */}
        <section className="py-20 bg-gradient-to-br from-primary-50 to-emerald-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="section-title text-center mb-16 text-4xl">Cómo Empezar</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {steps.map((step) => (
                <div key={step.number} className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary-600 to-emerald-600 text-white rounded-2xl flex items-center justify-center text-4xl font-bold mx-auto mb-6 shadow-lg">
                    {step.number}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {step.title}
                  </h3>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-10 shadow-lg border-2 border-amber-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Información Orientativa, No Diagnóstico
              </h2>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                Esta plataforma proporciona información educativa y orientativa sobre salud.
                <strong className="block mt-3 text-xl text-amber-900">
                  No reemplaza la consulta con profesionales médicos.
                </strong>
                Siempre consulte a su médico para diagnósticos y tratamientos.
              </p>
              {!isAuthenticated && (
                <Link href="/registro">
                  <Button variant="primary" size="lg">
                    Crear Cuenta Gratis
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
