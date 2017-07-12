'use strict';

const express = require('express');
const path = require('path');

const app = express();
const bodyParser = require('body-parser');

// For parsing application/json
app.use(bodyParser.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// API
const api = require('./api');
app.use('/api', api);

// For all other requests, send back React's index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(`${__dirname}/client/build/index.html`));
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`nsily listen on port ${port}`);
});
