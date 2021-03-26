const path = require("path");

module.exports = {
  webpack: {
    configure: {
      entry: path.join(__dirname, "src", "client", "index.js"),
    },
  },
};
