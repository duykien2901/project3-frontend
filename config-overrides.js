const {
  override,
  fixBabelImports,
  addLessLoader,
  addWebpackAlias,
  babelInclude,
  removeModuleScopePlugin,
  addBabelPreset,
  addExternalBabelPlugin
} = require("customize-cra");
const path = require("path");

module.exports = override(
  addWebpackAlias({
    'react-native': 'react-native-web',
    "@": path.join(__dirname, "src"),
    "@interfaces": path.join(__dirname, "src/interfaces"),
    "@components": path.join(__dirname, "src/components"),
    "@constants": path.join(__dirname, "src/constants"),
    "@ducks": path.join(__dirname, "src/ducks"),
    "@utils": path.join(__dirname, "src/libs/helpers/utils"),
    "@nocode/components": path.join(__dirname, "../marketplace/nocode/components"),
  })

);
