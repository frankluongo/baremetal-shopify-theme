const { entry } = require("./entryPoints");
const { babelLoader, cssLoader } = require("./loaders");
const { copyFiles, cssExtract } = require("./plugins");

exports.babelLoader = babelLoader;
exports.cssLoader = cssLoader;
exports.copyFiles = copyFiles;
exports.cssExtract = cssExtract;
exports.entry = entry;
