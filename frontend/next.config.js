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
  experimental: {
    esmExternals: 'loose',
  },
  images: {
    domains: ['localhost', 'storage.googleapis.com', 'res.cloudinary.com'],
    formats: ['image/avif', 'image/webp'],
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Exclude face-api and tensorflow from server-side bundling
      config.externals = [
        ...(config.externals || []),
        '@vladmandic/face-api',
        '@tensorflow/tfjs-node',
        '@mediapipe/face_detection',
        '@mediapipe/camera_utils'
      ];
    }
    // Ignore missing optional dependencies
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
