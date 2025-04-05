// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone', // Cloud Runでの実行に最適化
  // 環境変数の設定
  env: {
    // 環境変数はビルド時に埋め込まれます
  },
  // Cloud Runでの実行時にベースパスを設定
  basePath: '',
  // 画像最適化の設定
  images: {
    domains: ['lh3.googleusercontent.com'], // Googleアバター画像用
    unoptimized: process.env.NODE_ENV === 'production', // 本番環境では最適化を無効化
  },
  // 静的ファイルの設定
  assetPrefix: process.env.NODE_ENV === 'production' ? '' : '',
};

module.exports = nextConfig;
