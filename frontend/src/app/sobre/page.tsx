/**
 * Página Sobre Nosotros
 */

import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Card } from '@/components/ui/Card';

export default function SobrePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main id="main-content" className="flex-1 py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="section-title text-center break-words">Sobre Plataforma Salud Fabi</h1>

          <Card className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Nuestra Misión</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Plataforma Salud Fabi es una iniciativa dedicada a proporcionar acceso a información
              de salud accesible y comprensible para personas mayores y comunidades de Salta y NOA
              con baja habilidad tecnológica.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Nuestro objetivo es reducir barreras de acceso a educación en salud mediante una
              plataforma web diseñada con accesibilidad como prioridad.
            </p>
          </Card>

          <Card className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Principios Éticos</h2>
            <ul className="list-disc list-inside space-y-3 text-lg text-gray-700">
              <li><strong>No reemplazamos atención médica:</strong> Nuestra plataforma es orientativa y educativa.</li>
              <li><strong>Privacidad:</strong> Protegemos sus datos personales y de salud.</li>
              <li><strong>Accesibilidad:</strong> Diseño simple y grande para fácil uso.</li>
              <li><strong>Datos abiertos:</strong> Usamos información de fuentes confiables y públicas.</li>
              <li><strong>Consentimiento informado:</strong> Transparencia en el uso de herramientas.</li>
            </ul>
          </Card>

          <Card className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Características</h2>
            <ul className="list-disc list-inside space-y-3 text-lg text-gray-700">
              <li>Clases educativas sobre salud, nutrición y bienestar</li>
              <li>Calculadora de IMC con recomendaciones personalizadas</li>
              <li>Orientación sobre síntomas comunes (no diagnóstico)</li>
              <li>Diseño accesible WCAG AA con textos grandes y alto contraste</li>
              <li>Autenticación segura con opciones biométricas</li>
            </ul>
          </Card>

          <Card className="bg-primary-50">
            <h2 className="text-2xl font-bold mb-4">Contacto</h2>
            <p className="text-lg text-gray-700">
              Para consultas, sugerencias o asistencia técnica, contáctenos en:{' '}
              <a href="mailto:info@saludfabi.com" className="text-primary-600 hover:text-primary-700 font-semibold">
                info@saludfabi.com
              </a>
            </p>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
