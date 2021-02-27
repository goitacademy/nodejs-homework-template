const mongoose = require('mongoose');
require('dotenv').config();

const uriDB = process.env.DB_HOST;

const db = mongoose.connect(uriDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

mongoose.connection.on('connected', () => {
  console.log('Database connection successful');
});

mongoose.connection.on('error', err => {
  console.log(`Database connection error:${err.message}`);
});

mongoose.connection.on('disconnect', () => {
  console.log(`Mongoose disconnected`);
});

process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log(`Connection close, app terminated`);
  process.exit(1);
});

module.exports = db;
