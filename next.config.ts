/** @type {import('next').NextConfig} */
const nextConfig = {
  headers: async function headers() {
    return [
      {
        source: "/",
        headers: [
          {
            key: "Cross-Origin-Embedder-Policy",
            value: "require-corp",
          },
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin",
          },
        ],
      },
    ];
  },
  images: {
    domains: ["utfs.io"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
        port: "",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "5000", // Include the port number if you're running on a specific port
        pathname: "/**",
      },
    ],
  },
  experimental: {
    serverActions: {
      allowedOrigins: [
        "http://localhost:3000",
        "http://localhost:5000",
        "http://127.0.0.1:5500",
        "*",
        // "https://73twcr2k-3000.euw.devtunnels.ms",
      ],
    },
  },
};

module.exports = nextConfig;
