/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // During build process, ignore type errors to prevent build failures
    ignoreBuildErrors: false,
  },
  eslint: {
    // Allow production builds to successfully complete even if project has ESLint errors
    ignoreDuringBuilds: false,
  },
}

module.exports = nextConfig