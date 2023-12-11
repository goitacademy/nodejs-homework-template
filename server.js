const app = require('./app');
require('dotenv').config();
const mongoose = require('mongoose');

const DB_CONTACTS = process.env.DB_HOST;

const connection = mongoose.connect(DB_CONTACTS, {
  dbName: 'db-contacts',
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

connection
  .then(() => {
    app.listen(3000, () => {
      console.log('Database connection successful');
    });
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });