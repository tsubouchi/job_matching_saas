module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['lh3.googleusercontent.com'],
    unoptimized: true,
  },
  webpack: (config) => {
    return config;
  },
};
