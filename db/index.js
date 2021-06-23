const mongoose = require('mongoose');
require('dotenv').config();

const dbUri = process.env.URI_DB;

const db = mongoose.connect(dbUri, {
  useUnifiedTopology: true,
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: false,
});

mongoose.connection.on('connected', () => {
  console.log('Database connection successful');
});

mongoose.connection.on('error', err => {
  console.log(`Mongoose connection error: ${err.message}`);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Connection to DB closed');
    process.exit(1);
  });
});

module.exports = db;
