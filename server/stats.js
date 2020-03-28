const fs = require('fs');
const path = require('path');

const stats = (bundleName, bundleVersion) => {

  const bundleInfo = {
    'bundleName': bundleName,
    'bundleVersion': bundleVersion,
    'kb': '',
    'gzip': ''
  };

  const bundleNoSlash = bundleName.replace('/', '');
  const installPath = path.resolve(`./tmp/${bundleNoSlash}-${bundleVersion}`);
  const rawStats = fs.statSync(path.resolve(installPath, 'bundle.js'));
  bundleInfo.kb = rawStats.size / 1000;

  console.log('bundleInfo', bundleInfo);
  return bundleInfo;
}



module.exports = stats;