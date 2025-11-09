/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    domains: ['localhost', 'storage.googleapis.com', 'res.cloudinary.com'],
    formats: ['image/avif', 'image/webp'],
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Exclude face-api from server-side bundling
      config.externals = [...(config.externals || []), '@vladmandic/face-api'];
    }
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
