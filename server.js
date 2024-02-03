require('dotenv').config();

const mongoose = require('mongoose');
const app = require('./app');

const URI = process.env.DB_HOST;

mongoose
  .connect(URI)
  .then(() => {
    app.listen(3000, () => console.log('Database connection successful'));
  })
  .catch(err => {
    console.log(err.message);
    process.exit(1);
  });
