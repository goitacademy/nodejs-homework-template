const app = require('./app');
const mongoose = require('mongoose');
require('dotenv').config();

const PORT = process.env.PORT || 3000;
const DB_HOST = process.env.DB_HOST;
console.log(DB_HOST);

mongoose.set('strictQuery', false);

const connection = mongoose.connect(DB_HOST, {
  promiseLibrary: global.Promise,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

connection
  .then(() => {
    app.listen(PORT, () => {
      console.log('Database connection successful');
    });
  })
  .catch(err => {
    console.log(`Error message: ${err.message}`);
    process.exit(1);
  });
