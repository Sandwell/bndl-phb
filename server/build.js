const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const TerserPlugin = require('terser-webpack-plugin');

const build = (bundleName, bundleVersion) => {

  return new Promise((resolve, reject) => {
    const bundleNoSlash = bundleName.replace('/', '');
    const installPath = path.resolve(`./tmp/${bundleNoSlash}-${bundleVersion}`);
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
          minimizer: [new TerserPlugin()]
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
          } else {
            return resolve(stats);
          }
        })
      } else {
        return resolve(stats);
      }
    });
  });


};

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
}

module.exports = build;