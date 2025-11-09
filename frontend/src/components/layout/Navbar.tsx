/**
 * Componente Navbar
 * Barra de navegación principal accesible
 */

'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { Button } from '@/components/ui/Button';
import { useState } from 'react';

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, user, clearAuth } = useAuthStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    clearAuth();
    router.push('/');
  };

  const publicLinks = [
    { href: '/', label: 'Inicio' },
    { href: '/sobre', label: 'Sobre Nosotros' },
  ];

  const privateLinks = [
    { href: '/dashboard', label: 'Panel' },
    { href: '/clases', label: 'Clases' },
    { href: '/imc', label: 'IMC' },
    { href: '/predictor', label: 'Predictor' },
  ];

  const links = isAuthenticated ? [...publicLinks, ...privateLinks] : publicLinks;

  return (
    <nav
      className="bg-white shadow-lg border-b-4 border-primary-600"
      role="navigation"
      aria-label="Navegación principal"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo y nombre */}
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-3 no-underline">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-600 to-primary-700 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white text-2xl font-bold">S</span>
              </div>
              <span className="text-2xl font-bold text-gray-900 no-underline">
                Salud Para Salta y NOA
              </span>
            </Link>
          </div>

          {/* Links desktop */}
          <div className="hidden md:flex items-center gap-6">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-lg font-medium px-3 py-2 rounded-lg transition-colors no-underline ${
                  pathname === link.href
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                aria-current={pathname === link.href ? 'page' : undefined}
              >
                {link.label}
              </Link>
            ))}

            {isAuthenticated ? (
              <div className="flex items-center gap-4 ml-4 pl-4 border-l-2 border-gray-200">
                <Link
                  href="/perfil"
                  className="text-lg font-medium text-gray-700 hover:text-primary-600 no-underline"
                >
                  {user?.nombre || 'Perfil'}
                </Link>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  Cerrar Sesión
                </Button>
              </div>
            ) : (
              <div className="flex gap-3 ml-4">
                <Link href="/login">
                  <Button variant="outline" size="sm">
                    Ingresar
                  </Button>
                </Link>
                <Link href="/registro">
                  <Button variant="primary" size="sm">
                    Registrarse
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Botón menú móvil */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label="Menú de navegación"
          >
            <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Menú móvil */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block text-lg font-medium px-4 py-3 rounded-lg no-underline ${
                  pathname === link.href
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            {isAuthenticated ? (
              <>
                <Link
                  href="/perfil"
                  className="block text-lg font-medium px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 no-underline"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {user?.nombre || 'Mi Perfil'}
                </Link>
                <div className="px-4 py-2">
                  <Button variant="outline" size="md" onClick={handleLogout} className="w-full">
                    Cerrar Sesión
                  </Button>
                </div>
              </>
            ) : (
              <div className="px-4 py-2 space-y-2">
                <Link href="/login" className="block">
                  <Button variant="outline" size="md" className="w-full">
                    Ingresar
                  </Button>
                </Link>
                <Link href="/registro" className="block">
                  <Button variant="primary" size="md" className="w-full">
                    Registrarse
                  </Button>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
