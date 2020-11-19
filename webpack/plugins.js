const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

exports.copyFiles = (dir) => {
  return new CopyPlugin({
    patterns: [
      { from: "./src/layout", to: path.resolve(dir, "dist/layout"), noErrorOnMissing: true },
      { from: "./src/sections", to: path.resolve(dir, "dist/sections"), noErrorOnMissing: true },
      { from: "./src/snippets", to: path.resolve(dir, "dist/snippets"), noErrorOnMissing: true },
      { from: "./src/templates", to: path.resolve(dir, "dist/templates"), noErrorOnMissing: true },
      { from: "./src/assets/images", to: path.resolve(dir, "dist/assets"), noErrorOnMissing: true },
      { from: "./src/assets/fonts", to: path.resolve(dir, "dist/assets"), noErrorOnMissing: true },
      {
        from: "./src/locales/en.default.json",
        to: path.resolve(dir, "dist/locales/en.default.json"),
      },
      {
        from: "./src/config/settings_schema.json",
        to: path.resolve(dir, "dist/config/settings_schema.json"),
      },
    ],
  });
};

exports.cssExtract = () => {
  const plugin = new MiniCssExtractPlugin();
  const loader = MiniCssExtractPlugin.loader;
  return { plugin, loader };
};
