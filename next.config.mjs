/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  productionBrowserSourceMaps: true,
  swcMinify: false,
  images: {
    domains: ["acdn.mitiendanube.com", "res.cloudinary.com"],
  },
};

export default nextConfig;
