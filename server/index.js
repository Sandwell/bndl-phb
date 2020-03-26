const express = require('express');
const path = require('path');
const request = require('request');
const app = express();

// Serve the static files from the React Server
app.use(express.static(path.join(__dirname, '../build')));

// An api endpoint that returns a list of package
app.get('/api/getBundleList', (req, res) => {
  request.get(`https://www.npmjs.com/search/suggestions?q=${req.query.search}`, (error, response, body) => {
    if (error) {
      return console.log(error);
    }
    res.json(JSON.parse(body));
  });
});

// An api endpoint that returns versions of a package
app.get('/api/getBundleVersions/', (req, res) => {
  request.get(`https://registry.npmjs.org/${req.query.bundleName}`, (error, response, body) => {
    if (error) {
      return console.log(error);
    }

    const bundleDetails = JSON.parse(body);
    const versions = Object.keys(bundleDetails.versions).reverse();
    let previousMajorVersion;
    const filteredVersions = versions
      .sort((a, b) => {
        return b.substring(0, 1) - a.substring(0, 1);
      })
      .filter((v, i) => {
        // We take the last 3 versions
        if (i < 3) {
          // On the last item we set previousMajorVersion
          if (i === 2) {
            previousMajorVersion = (v.substring(0, 1) - 1).toString();
          }
          return true;
        }
        if (v.startsWith(previousMajorVersion) && +v.substring(4, 5) === 0) {
          return true;
        }
      });
    res.json(filteredVersions.slice(0, 4));
  });
});

// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '../build/index.html'));
});

const port = process.env.PORT || 8080;
app.listen(port);

console.log('Server is listening on port ' + port);