/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: false,
    domains: ['source.unsplash.com'], // ✅ Add this line to allow external Unsplash images
  },
};

export default nextConfig;
