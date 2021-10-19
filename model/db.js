const mongoose = require('mongoose');
require('dotenv').config();
const uriDb = process.env.URI_DB;

const db = mongoose.connect(uriDb, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Database connection successful');
});
mongoose.connection.on('error', async err => {
  console.log(`Monggose connection error: ${err.message}`);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('Connection to db closed and app has been terminated');
  process.exit(1);
});

module.exports = db;
