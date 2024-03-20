const path = require("path");

module.exports = {
  mode: "development",
  entry: ["./client/index.js"],

  output: {
    path: path.join(__dirname, "public"),
    filename: "bundle.js",
    publicPath: "/public/",
  },
  stats: {
    errorDetails: true,
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-react"],
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
    ],
  },
  resolve: {
    alias: {
      buffer: "buffer", // Add this line
    },
    fallback: {
      path: require.resolve("path-browserify"),
      fs: false, // No browser-based alternative
      stream: require.resolve("stream-browserify"),
      util: require.resolve("util/"),
    },
  },
};
