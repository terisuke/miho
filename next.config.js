const path = require("path");

const nextConfig = {
  reactStrictMode: true,
  assetPrefix: process.env.NEXT_PUBLIC_ROOT || "",
  basePath: process.env.NEXT_PUBLIC_ROOT || "",
  trailingSlash: true,
  publicRuntimeConfig: {
    root: process.env.NEXT_PUBLIC_ROOT || "",
  },
  optimizeFonts: false,
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve(__dirname, "src"),
    };
    return config;
  },
  images: {
    unoptimized: true, // 画像最適化を無効にする
  },
  exportPathMap: async function (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
    return {
      '/': { page: '/' },
      '/login': { page: '/login' },
      // 他のルートがあればここに追加
    };
  },
};

module.exports = nextConfig;
