
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractLess = new ExtractTextPlugin(`style.[hash].css`);

var webpack = require('webpack');
var merge = require('webpack-merge');
const multipleThemesCompile = require('webpack-multiple-themes-compile');



// module.exports = {
//   module: {
//     rules: [
//       {
//         test: /\.less$/,
//         loader: extractLess.extract({
//           use: [{ loader: 'css-loader' }, { loader: 'less-loader?javascriptEnabled=true' }]
//         })
//       }
//     ]
//   }
// }
// addLessLoader({
//   // If you are using less-loader@5 or older version, please spread the lessOptions to options directly.
//   lessOptions: {
//     javascriptEnabled: true,
//     modifyVars: {
//       '@base-color': '#b4c1d1',
//     }
//   }
// })

// const webpackConfigs = function override(config, env) {

//     config.resolve.plugins = config.resolve.plugins.filter(plugin => !(plugin instanceof ModuleScopePlugin));

//     return config;
//   };

// const webpackConfigs = {
//   module: {
//     rules: [
//       {
//         test: /\.less$/,
//         loader: extractLess.extract({
//           use: [{ loader: 'css-loader' }, { loader: 'less-loader?javascriptEnabled=true' }]
//         })
//       }
//     ]
//   }
// }

// function override(config, env) {
//   config.resolve.plugins = config.resolve.plugins.filter(plugin => !(plugin instanceof ModuleScopePlugin));

//   return config;
// },

module.exports = function override(config, env) {
  config.resolve.plugins = config.resolve.plugins.filter(plugin => !(plugin instanceof ModuleScopePlugin));
  return config;
}

// module.exports = merge(
//   multipleThemesCompile({
//     themesConfig: {
//       default: {},
//       green: {
//         'base-color': '#008000'
//       },
//       yellow: {
//         'base-color': '#ffff00'
//       }
//     }
//   })
// ),
// {
//   module: {
//     rules: [
//       {
//         test: /\.less$/,
//         loader: extractLess.extract({
//           use: [{ loader: 'css-loader' }, { loader: 'less-loader?javascriptEnabled=true' }]
//         })
//       }
//     ]
//   },

// }

