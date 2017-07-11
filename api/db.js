'use strict';

const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const dbURI = process.env.MONGO_DB_URI || 'mongodb://localhost/nsily';

// Create the database connection
mongoose.connect(dbURI, { useMongoClient: true });

// Connection events:

// On connection success
mongoose.connection.on('connected', () => {
  console.log(`DB connection open to ${dbURI}`);
});

// On connection error
mongoose.connection.on('error', err => {
  console.log(`DB connection error`, err);
});

// On connection disconnect
mongoose.connection.on('dicosnnected', () => {
  console.log(`DB connection disconnected`);
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log(`DB connection closing from app termination`);
    process.exit(0);
  });
});
