/**
 * Página de Política de Privacidad
 */

'use client';

import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Card } from '@/components/ui/Card';

export default function PrivacidadPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-gradient-to-br from-blue-50 to-green-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <Card className="p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Política de Privacidad
          </h1>

          <div className="space-y-6 text-gray-700">
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
              <p className="font-semibold text-blue-900">
                Proyecto Académico - Universidad
              </p>
              <p className="text-sm text-blue-800 mt-2">
                Este es un proyecto de desarrollo académico que forma parte de un trabajo universitario.
                El sistema está desarrollado con fines educativos y de investigación, complementando
                la documentación técnica correspondiente.
              </p>
            </div>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                1. Alcance del Proyecto
              </h2>
              <p>
                Este sistema de salud ha sido desarrollado como parte de un proyecto académico
                para demostrar la implementación de tecnologías modernas en el ámbito de la salud
                preventiva y el bienestar.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                2. Uso de Datos
              </h2>
              <p>
                Los datos ingresados en este sistema son utilizados únicamente con fines de
                demostración y evaluación académica. La información personal recopilada incluye:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Nombre y datos de contacto</li>
                <li>Información de salud (IMC, edad, peso, altura)</li>
                <li>Datos de reconocimiento facial para autenticación</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                3. Seguridad
              </h2>
              <p>
                Se implementan medidas de seguridad estándar de la industria, incluyendo
                encriptación de contraseñas, autenticación segura y protección de datos sensibles.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                4. Contacto
              </h2>
              <p>
                Para consultas sobre este proyecto académico o el manejo de datos,
                puede contactar al equipo de desarrollo a través de los canales institucionales.
              </p>
            </section>
          </div>
        </Card>
      </div>
    </main>
    <Footer />
    </div>
  );
}
