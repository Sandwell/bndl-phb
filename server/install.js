const childProcess = require('child_process');

const install = (bundleName, bundleVersion) => {
  return new Promise((resolve, reject) => {
    const customPath = createCustomDirectory(bundleName, bundleVersion);
    childProcess.exec(`npm install ${bundleName}@${bundleVersion} --prefix ${customPath} --no-package-lock --progress false --loglevel error`, (error, stdout, stderr) => {
      if (error) {
        console.warn('Error in install.js', error);
      }
      console.log(`${bundleName}-${bundleVersion} is installed`);
      return resolve();
    });
  });
};

const createCustomDirectory = (bundleName, bundleVersion) => {
  return './tmp/' + bundleName.replace('/', '') + '-' + bundleVersion;
}


module.exports = install;