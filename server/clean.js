const fs = require('fs');
const tmpDir = './tmp';

/**
 * Clean the tmp folder whe we are done
 */
const clean = () => {
  deleteFolderRecursive(tmpDir);
  console.log('/tmp folder cleaned');
};

const deleteFolderRecursive = (path) => {
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach((file, index) => {
      var curPath = `${path}/${file}`;
      if (fs.lstatSync(curPath).isDirectory()) { // recurse
        deleteFolderRecursive(curPath);
      } else { // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
};

module.exports = clean;