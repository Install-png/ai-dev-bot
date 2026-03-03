javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ['via.placeholder.com'], // Add any domains for external images
  },
  // Optionally, you can add more configurations like environment variables here
  // env: {
  //   API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
  //   WS_BASE_URL: process.env.NEXT_PUBLIC_WS_BASE_URL,
  // },
};

module.exports = nextConfig;