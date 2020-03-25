const express = require('express');
const path = require('path');
const server = express();

// Serve the static files from the React server
server.use(express.static(path.join(__dirname, '../build')));

// An api endpoint that returns a short list of items
server.get('/api/getList', (req, res) => {
  var list = ["item1", "item2", "item3"];
  res.json(list);
  console.log('Sent list of items');
});

// Handles any requests that don't match the ones above
server.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '../build/index.html'));
});

const port = process.env.PORT || 8080;
server.listen(port);

console.log('Server is listening on port ' + port);