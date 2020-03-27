const express = require('express');
const path = require('path');
const request = require('request');
const app = express();
const version = require('./version');

// Serve the static files from the React Server
app.use(express.static(path.join(__dirname, '../build')));

/**
 * Endpoint that return bundle list
 */
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
  request.get(`https://registry.npmjs.org/${req.query.bundleName}`, (error, response, body) => {
    if (error) {
      return console.log(error);
    }
    const bundleDetails = JSON.parse(body);
    const filteredVersions = version(bundleDetails.versions);
    console.log(filteredVersions);
    res.json(bundleDetails.versions);
  });
});

// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '../build/index.html'));
});

const port = process.env.PORT || 8080;
app.listen(port);

console.log('Server is listening on port ' + port);