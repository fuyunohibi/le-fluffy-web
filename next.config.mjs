/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "images.unsplash.com",
      "unsplash.com",
      "static.bangkokpost.com",
      "th.bing.com",
      "d1jyxxz9imt9yb.cloudfront.net",
    ], // Add your allowed external domain
  },
};

export default nextConfig; // Use export instead of module.exports

