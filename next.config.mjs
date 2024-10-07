/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["images.unsplash.com", "unsplash.com", 'static.bangkokpost.com'], // Add your allowed external domain
  },
};

export default nextConfig; // Use export instead of module.exports

