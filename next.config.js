const path = require("path");

module.exports = {
  reactStrictMode: true,
  env: {
    mongodburl:
      "mongodb+srv://flaviobrasso:M0n60db%21789@notes.tskkj.mongodb.net/marketplace?retryWrites=true&w=majority",
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    config.resolve.alias.components = path.resolve(
      __dirname,
      "src",
      "components"
    );
    config.resolve.alias.middleware = path.resolve(
      __dirname,
      "src",
      "middleware"
    );
    config.resolve.alias.helpers = path.resolve(__dirname, "src", "helpers");
    config.resolve.alias.styles = path.resolve(__dirname, "styles");
    config.resolve.alias.contexts = path.resolve(__dirname, "src", "contexts");
    config.resolve.alias.services = path.resolve(__dirname, "src", "services");
    config.resolve.alias.state = path.resolve(__dirname, "src", "state");

    return config;
  },
  images: {
    domains: ["picsum.photos"],
  },
};
