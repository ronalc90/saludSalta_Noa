import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Salud Para Salta y NOA - Plataforma de Salud Accesible',
  description: 'Plataforma de salud accesible para personas mayores en Salta y NOA. Clases educativas, calculadora IMC y orientación en salud.',
  keywords: ['salud', 'salta', 'noa', 'personas mayores', 'accesibilidad', 'educación salud'],
  authors: [{ name: 'Salud Para Salta y NOA' }],
  viewport: 'width=device-width, initial-scale=1, maximum-scale=5',
  themeColor: '#16a34a',
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    url: 'https://yourdomain.com',
    title: 'Salud Para Salta y NOA',
    description: 'Plataforma de salud accesible para Salta y NOA',
    siteName: 'Salud Para Salta y NOA',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <a href="#main-content" className="skip-to-main">
          Saltar al contenido principal
        </a>
        {children}
      </body>
    </html>
  );
}
