import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/visas/:path*',
        destination: 'https://immigration-api-kappa.vercel.app/api/visas/:path*', // Proxy to Express backend
      },
    ];
  },
};

export default nextConfig;
