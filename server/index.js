const express = require('express');
const path = require('path');
const request = require('request');
const app = express();

// Serve the static files from the React Server
app.use(express.static(path.join(__dirname, '../build')));

// An api endpoint that returns a list of package
app.get('/api/getBundleList', (req, res) => {
  request.get(`https://www.npmjs.com/search/suggestions?q=${req.query.bundleName}`, (error, response, body) => {
    if (error) {
      return console.log(error);
    }
    res.json(JSON.parse(body))
  });
});

// An api endpoint that returns versions of a package
app.get('/api/getVersions', (req, res) => {
  res.send('TEST');
  // request.get('https://registry.npmjs.org/react', (error, response, body) => {
  //   console.log('getVerions');
  // });
});

// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '../build/index.html'));
});

const port = process.env.PORT || 8080;
app.listen(port);

console.log('Server is listening on port ' + port);