import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  // Disable API routes during build
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
