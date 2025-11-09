/**
 * Página de Términos y Condiciones
 */

'use client';

import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Card } from '@/components/ui/Card';

export default function TerminosPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-gradient-to-br from-blue-50 to-green-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <Card className="p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Términos y Condiciones de Uso
          </h1>

          <div className="space-y-6 text-gray-700">
            <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
              <p className="font-semibold text-green-900">
                Proyecto Académico - Universidad
              </p>
              <p className="text-sm text-green-800 mt-2">
                Este es un proyecto de desarrollo académico que forma parte de un trabajo universitario.
                El sistema ha sido desarrollado con fines educativos y de investigación, y está
                acompañado de la documentación técnica y académica correspondiente.
              </p>
            </div>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                1. Naturaleza del Proyecto
              </h2>
              <p>
                Este sistema es un proyecto académico desarrollado para demostrar la aplicación
                de tecnologías modernas en soluciones de salud preventiva. No constituye un
                servicio médico profesional y su uso es únicamente con fines demostrativos y educativos.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                2. Uso Aceptable
              </h2>
              <p>
                Al utilizar este sistema, el usuario acepta que:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Comprende que es un proyecto académico de demostración</li>
                <li>La información proporcionada por el sistema no sustituye consejo médico profesional</li>
                <li>Los datos ingresados pueden ser utilizados para fines académicos y de evaluación</li>
                <li>El sistema está en desarrollo y puede contener funcionalidades experimentales</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                3. Funcionalidades del Sistema
              </h2>
              <p>
                El sistema incluye las siguientes funcionalidades desarrolladas como parte del proyecto:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Cálculo y seguimiento de Índice de Masa Corporal (IMC)</li>
                <li>Predicciones de salud basadas en machine learning</li>
                <li>Gestión de clases y actividades de bienestar</li>
                <li>Autenticación mediante reconocimiento facial</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                4. Limitaciones de Responsabilidad
              </h2>
              <p>
                Este sistema se proporciona tal cual con fines educativos. Los desarrolladores
                y la institución educativa no se hacen responsables de decisiones tomadas
                basándose en la información proporcionada por el sistema.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                5. Propiedad Intelectual
              </h2>
              <p>
                Este proyecto ha sido desarrollado como trabajo académico. El código y la
                documentación están sujetos a las políticas de propiedad intelectual de la
                institución educativa correspondiente.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                6. Contacto
              </h2>
              <p>
                Para consultas académicas sobre este proyecto, favor de contactar a través
                de los canales oficiales de la institución educativa.
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
