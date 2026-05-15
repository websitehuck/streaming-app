/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  
  env: {
    NEXT_PUBLIC_API_URL: process.env.CLIENT_URL || 'http://localhost:3001',
  },

  images: {
    domains: [
      'localhost',
      'crowntunzmusic.com',
      'cdn.example.com',
    ],
    formats: ['image/avif', 'image/webp'],
  },

  headers: async () => {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          }
        ]
      }
    ];
  },

  redirects: async () => {
    return [];
  },

  rewrites: async () => {
    return {
      beforeFiles: [
        {
          source: '/api/:path*',
          destination: 'http://localhost:3001/api/:path*',
        }
      ]
    };
  }
};

module.exports = nextConfig;
