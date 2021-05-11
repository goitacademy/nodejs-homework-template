const mongoose = require('mongoose');
require('dotenv').config();
const uriDb = process.env.URI_DB;

const db = mongoose.connect(uriDb, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

mongoose.connection.on('connected', () => {
  console.log('You are connected to DB!!');
});
mongoose.connection.on('error', (err) => {
  console.log(`Connection error ${err.message}`);
});
mongoose.connection.on('disconnected', () => {
  console.log('Mongoose was disconnected');
});

process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('Connection was closed!');
  process.exit(1);
});

module.exports = db;
