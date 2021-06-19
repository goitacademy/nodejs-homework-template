const mongoose = require('mongoose');
require('dotenv').config();

const uriDb = process.env.URI_DB;

const db = mongoose.connect(uriDb, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

mongoose.connection.on(
  'connected',
  console.error.bind(console, () => {
    console.log('Mongoose connected');
  }),
);

mongoose.connection.on(
  'error',
  console.error.bind(console, err => {
    console.log(`Mongoose connection error: ${err.message}`);
  }),
);

mongoose.connection.on(
  'disconnected',
  console.error.bind(console, () => {
    console.log('Mongoose disconnected');
  }),
);

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Connection for DB disconnected and terminated');
    process.exit(1);
  });
});

module.exports = db;
