const mongoose = require('mongoose');

require('dotenv').config();
const uriDb = process.env.DB_HOST;

const db = mongoose.connect(uriDb, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Database connection successful');
});

mongoose.connection.on('error', err => {
  console.log(`Database connection error ${err.message}`);
  process.exit(1);
});

process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('Database connection closed');
  process.exit();
});

module.exports = db;
