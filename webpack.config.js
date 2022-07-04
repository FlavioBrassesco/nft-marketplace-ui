const path = require("path");
module.exports = {
  resolve: {
    alias: {
      components: path.resolve(__dirname, "src", "components"),
      middleware: path.resolve(__dirname, "src", "middleware"),
      helpers: path.resolve(__dirname, "src", "helpers"),
      styles: path.resolve(__dirname, "styles"),
      contexts: path.resolve(__dirname, "src", "contexts"),
      services: path.resolve(__dirname, "src", "services"),
      state: path.resolve(__dirname, "src", "state"),
    },
  },
};
