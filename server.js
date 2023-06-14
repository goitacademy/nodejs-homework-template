const app = require('./app');
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.Promise = global.Promise;

const PORT = process.env.PORT || 3000;
const DB_HOST = process.env.DB_HOST;

mongoose.set('strictQuery', false);

const connection = mongoose.connect(DB_HOST, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

connection
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Database connection successful`);
    });
  })
  .catch(err => {
    console.log(`Server not running. Error message: ${err.message}`);
    process.exit();
  });
