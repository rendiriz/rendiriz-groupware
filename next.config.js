/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['placehold.co', 'ik.imagekit.io'],
  },
  experimental: {
    nextScriptWorkers: true,
  },
};

module.exports = nextConfig;
