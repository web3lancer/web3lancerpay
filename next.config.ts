import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  ignoreBuildErrors: true,
  // also ignore lint errors
  eslint: {
    ignoreDuringBuilds: true,
  },
    
};

export default nextConfig;
