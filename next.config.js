/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ]
    // domains: ["cdn.sanity.io"],
  },
};

module.exports = nextConfig;
