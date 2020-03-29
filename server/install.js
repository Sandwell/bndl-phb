const childProcess = require('child_process');
const path = require('path');

/**
 * Install package into specific directory
 */
const install = (bundleName, bundleVersion) => {
  return new Promise((resolve, reject) => {
    const installPath = path.resolve('./tmp/', bundleVersion);
    childProcess.exec(`npm install ${bundleName}@${bundleVersion} --prefix ${installPath} --no-package-lock --progress false --loglevel error`, (error, stdout, stderr) => {
      if (error) {
        console.warn('Error in install.js', error);
        return reject(error);
      }
      console.log(`${bundleName}-${bundleVersion} is installed`);
      return resolve();
    });
  }).catch();
};

module.exports = install;