const mongoose = require('mongoose');
require('dotenv').config();

const uriDB = process.env.URI_DB;

const db = mongoose.connect(uriDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('error', error => {
  console.log('Mongoose Error', error);
});

mongoose.connection.on('disconected', () => {
  console.log('Mongoose disconected');
});

process.on('SIGINT', async () => {
  mongoose.connection.close(() => {
    console.log('Connection to db closed');
    process.exit(1);
  });
});

module.exports = db;
