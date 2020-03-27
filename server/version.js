const version = (versions) => {
  let filteredVersions = [];
  let previousMajorVersion;
  let previousMajorVersionFound;
  Object.keys(versions)
    // Sort all versions by number because sometimes some patches are realeased after a next major version
    // The minus operator will cast the string into a number
    .sort((a, b) => {
      return concatVersion(b) - concatVersion(a);
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
        // Here we use a flag because others older versions will satisfy the condition
        // and we do not want to slice the array after
        previousMajorVersionFound = true;
        filteredVersions.push(v);
      }
      if (filteredVersions.length > 3) {
        // We used some instead of filter so we can break the loop when we got our 4 needed versions
        return true;
      }
    });
  return filteredVersions;
}

/**
 * Transform version into workable string
 */
const concatVersion = (version) => {
  return +version.split('-')[0].split('.').join('');
}

module.exports = version;