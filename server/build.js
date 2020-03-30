const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const TerserPlugin = require('terser-webpack-plugin');

/**
 * Build package into bundle by creating a file requiring the package
 * and then build it with webpack
 */
const build = (bundleName, bundleVersion) => {
  return new Promise((resolve, reject) => {
    const installPath = path.resolve('./tmp/', bundleVersion);
    const requiredImport = `const bundle = require('./node_modules/${bundleName}');`;

    const getWebPackConfig = (externals) => {
      return {
        mode: 'production',
        entry: path.resolve(installPath, 'index.js'),
        output: {
          filename: 'bundle.js',
          path: path.resolve(installPath)
        },
        externals: externals ? externals : {},
        optimization: {
          minimize: true,
          minimizer: [new TerserPlugin({})]
        }
      }
    };

    fs.writeFileSync(path.resolve(installPath, 'index.js'), requiredImport);

    webpack(getWebPackConfig(), (err, stats) => {
      if (err || stats.hasErrors()) {
        const externals = getBundlesNotFound(stats.compilation.errors);
        webpack(getWebPackConfig(externals), (err, stats) => {
          if (err || stats.hasErrors()) {
            console.log('Error in build.js', stats.compilation.errors);
            return reject(err || stats.compilation.errors);
          } else {
            return resolve();
          }
        })
      } else {
        return resolve();
      }
    });
  }).catch();
};

/**
 * Sometimes a package needs externals bundles to compile
 * so we need to exclude them in order to evaluate the right bundle
 */
const getBundlesNotFound = (errors) => {
  const externals = {};
  errors.map((error, i) => {
    if (error.name === 'ModuleNotFoundError') {
      const match = error.error.details.match(/resolve '(.+)' in/);
      externals[match[1]] = match[1].replace('@', '');
    }
  });
  console.log('externals', externals);
  return externals;
};

module.exports = build;