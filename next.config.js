/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['placehold.co'],
  },
  experimental: {
    nextScriptWorkers: true,
  },
};

module.exports = nextConfig;
