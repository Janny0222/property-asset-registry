import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  serverExternalPackages: ['sequelize', 'sequelize-typescript'],
};

export default nextConfig;
