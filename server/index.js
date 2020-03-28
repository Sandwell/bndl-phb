const express = require('express');
const path = require('path');
const request = require('request');
const app = express();

const version = require('./version');
const clean = require('./clean');
const install = require('./install');
const build = require('./build');
const stats = require('./stats');

/**
 * Serve the static files from the React Server
 */
app.use(express.static(path.join(__dirname, '../build')));

app.get('/api/getBundleList', (req, res) => {
  request.get(`https://www.npmjs.com/search/suggestions?q=${req.query.search}`, (error, response, body) => {
    if (error) {
      return console.error(error);
    }
    res.json(JSON.parse(body));
  });
});

/**
 * Endpoint that return bundle infos
 */
app.get('/api/getBundleDetails/', (req, res) => {
  const bundleName = req.query.bundleName;
  const bundlesInfos = [];
  request.get(`https://registry.npmjs.org/${bundleName}`, (error, response, body) => {
    if (error) {
      return console.log('Error in index.js', error);
    }
    const bundleDetails = JSON.parse(body);
    if (!bundleDetails.error) {
      // Process versions
      const filteredVersions = version(bundleDetails.versions);
      console.log('filteredVersions', filteredVersions);

      // Clean tmp folder
      clean();

      // Install bundles in tmp directory
      const installPromises = filteredVersions.map((bundleVersion, i) => {

        return install(bundleName, bundleVersion);

      });

      Promise.all(installPromises).then(_ => {
        console.log('all bundles are installed');

        const buildPromises = filteredVersions.map((bundleVersion, i) => {

          return build(bundleName, bundleVersion);

        });

        Promise.all(buildPromises).then(_ => {
          console.log('all bundles are built');
          filteredVersions.map((bundleVersion, i) => {

            bundlesInfos.push(stats(bundleName, bundleVersion));

          });
        })
      });

      console.log('bundlesInfos', bundlesInfos);

      res.json(bundleDetails.versions);
    } else {
      // Error
      res.json({
        error: 'Bundle not found'
      });
    }
  });
});

/**
 * Handles any requests that don't match the ones above
 */
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '../build/index.html'));
});

const port = process.env.PORT || 8080;
app.listen(port);

console.log('Server is listening on port ' + port);