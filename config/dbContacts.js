const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.URI_DB;

const dbContacts = mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connection', () => {
  console.log('Mongoose connection to DB Contacts');
});

mongoose.connection.on('connection', error => {
  console.log(`Mongoose connection to DB Contacts error ${error.message}`);
});

process.on('SIGINT', async () => {
  await mongoose.connection.closed();
  console.log('Connection to DB Contacts closed');
  process.exit();
});

module.exports = dbContacts;
