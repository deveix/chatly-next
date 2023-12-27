/** @type {import('next').NextConfig} */
module.exports = {
  webpack: (config, {isServer}) => {
    if (!isServer) {
      // Exclude the folder from being processed in the client-side bundle
      config.module.rules.push({
        test: /functions/,
        loader: "null-loader", // A loader that does nothing
      });
    }
    return config;
  },
};

module.exports = nextConfig;
