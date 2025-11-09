/**
 * Componente Footer
 * Pie de página con información de contacto
 */

import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-gray-800 to-gray-900 text-white mt-auto" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Información */}
          <div>
            <h3 className="text-xl font-bold mb-4">Salud Para Salta y NOA</h3>
            <p className="text-gray-300 text-base leading-relaxed">
              Plataforma de salud accesible para personas mayores en Salta y NOA.
              Información orientativa, no sustituye la atención médica profesional.
            </p>
          </div>

          {/* Enlaces */}
          <div>
            <h3 className="text-xl font-bold mb-4">Enlaces</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/sobre" className="text-gray-300 hover:text-white text-base">
                  Sobre Nosotros
                </Link>
              </li>
              <li>
                <Link href="/clases" className="text-gray-300 hover:text-white text-base">
                  Clases Educativas
                </Link>
              </li>
              <li>
                <Link href="/privacidad" className="text-gray-300 hover:text-white text-base">
                  Política de Privacidad
                </Link>
              </li>
              <li>
                <Link href="/terminos" className="text-gray-300 hover:text-white text-base">
                  Términos de Uso
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contacto</h3>
            <p className="text-gray-300 text-base mb-2">
              Para consultas o asistencia técnica:
            </p>
            <p className="text-gray-300 text-base">
              Email: <a href="mailto:info@saludfabi.com" className="text-primary-400 hover:text-primary-300">
                info@saludfabi.com
              </a>
            </p>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-base">
            &copy; {currentYear} Salud Para Salta y NOA. Todos los derechos reservados.
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Desarrollado con accesibilidad y ética en salud.
          </p>
        </div>
      </div>
    </footer>
  );
}
