/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },

  async rewrites() {
    return [
      {
        source: "/api/weather",
        destination: "https://api.openweathermap.org/data/2.5/weather",
      },
      {
        source: "/api/forecast",
        destination: "https://api.openweathermap.org/data/2.5/forecast",
      },
    ]
  },
}

export default nextConfig
