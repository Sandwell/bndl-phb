const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

/**
 * Get stats we need in Front-End
 */
const stats = (bundleName, bundleVersion) => {
  const bundleInfo = {
    'bundleName': bundleName,
    'bundleVersion': bundleVersion,
    'min': '',
    'gzip': ''
  };

  const installPath = path.resolve('./tmp/', bundleVersion);
  const bundlePath = path.join(installPath, 'bundle.js');
  const rawStats = fs.statSync(bundlePath);
  const buffer = Buffer.from(fs.readFileSync(bundlePath));

  bundleInfo.min = rawStats.size / 1000;
  bundleInfo.gzip = zlib.deflateSync(buffer).length / 1000;

  return bundleInfo;
};



module.exports = stats;