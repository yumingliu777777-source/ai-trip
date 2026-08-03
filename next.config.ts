import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.hdslb.com",
      },
      {
        protocol: "https",
        hostname: "**.bilibili.com",
      },
    ],
  },
};

export default nextConfig;