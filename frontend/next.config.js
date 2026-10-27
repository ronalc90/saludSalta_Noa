/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  eslint: {
    // Solo advertir en build, no fallar
    ignoreDuringBuilds: true,
  },
  typescript: {
    // No fallar el build por errores de TypeScript
    ignoreBuildErrors: false,
  },
  // Librerías de visión que solo corren en el navegador: en el servidor se
  // cargan con require nativo en lugar de empaquetarlas.
  serverExternalPackages: [
    '@vladmandic/face-api',
    '@tensorflow/tfjs-node',
    '@mediapipe/face_detection',
    '@mediapipe/camera_utils',
  ],
  images: {
    // localhost solo en desarrollo: en producción el optimizador no debe pedir
    // recursos internos del servidor (SSRF).
    remotePatterns: [
      { protocol: 'https', hostname: 'storage.googleapis.com' },
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      ...(process.env.NODE_ENV === 'production'
        ? []
        : [{ protocol: 'http', hostname: 'localhost' }]),
    ],
    // Sin AVIF: Next 15.5.28 ya corrige GHSA-2xp9-vwfh-vxw4 (ejecución remota al
    // optimizar AVIF), pero se mantiene fuera como defensa en profundidad.
    formats: ['image/webp'],
  },
  webpack: (config) => {
    // face-api referencia @tensorflow/tfjs-node, que no está instalado.
    config.resolve.fallback = {
      ...config.resolve.fallback,
      '@tensorflow/tfjs-node': false,
    };
    return config;
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
