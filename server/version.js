/**
 * Process versions of a package in order to 
 * retrieve what we want : last 3 versions and the previous major version
 */
const version = (versions) => {
  let filteredVersions = [];
  let previousMajorVersion;
  let previousMajorVersionFound = false;
  Object.keys(versions)
    // Sort all versions by number because the list provided by NPM registry is not ordered
    // and does not contain dates.
    .sort((a, b) => {
      const aArr = transformVersion(a);
      const bArr = transformVersion(b);
      if (bArr[0] > aArr[0]) {
        return 1;
      } else if (bArr[0] < aArr[0]) {
        return -1;
      }
      if (bArr[1] > aArr[1]) {
        return 1;
      } else if (bArr[1] < aArr[1]) {
        return -1;
      }
      if (bArr[2] > aArr[2]) {
        return 1;
      } else if (bArr[2] < aArr[2]) {
        return -1;
      }
    })
    .some((v, i) => {
      const vArr = v.split('.');
      // We take the last 3 versions
      if (i < 3) {
        if (i === 2) {
          // On the third last version we set previousMajorVersion
          // as a string so we can use startsWith after
          previousMajorVersion = (vArr[0] - 1).toString();
        }
        filteredVersions.push(v);
      }
      if (v.startsWith(previousMajorVersion) && vArr[2] === '0' && !previousMajorVersionFound) {
        // Here we use a flag because others older versions will satisfy this condition
        // and we do not want to slice the array after
        previousMajorVersionFound = true;
        filteredVersions.push(v);
      }
      if (filteredVersions.length > 3) {
        // We used some instead of filter method so we can break the loop when we got our 4 needed versions
        return true;
      }
    });
  return filteredVersions;
};

/**
 * Transform version
 */
const transformVersion = (version) => {
  let v = version.split('-')[0].split('.');
  return v.map(x => +x);
};

module.exports = version;