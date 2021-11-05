const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.URI_DB;

const db = mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Mongoose connection to DB');
});

mongoose.connection.on('error', error => {
  console.log(`Mongoose connection error ${error.message}`);
});

process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('Connection to DB closed');
  process.exit();
});

// client.connect(err => {
//   const collection = client.db('test').collection('devices');
//   // perform actions on the collection object
//   client.close();
// });

module.exports = db;
