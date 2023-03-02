const app = require('./app');
const mongoose = require('mongoose');

// XqGyC2o1WeY9N6nx
const {DB_HOST} = process.env;

mongoose.set('strictQuery', true);

mongoose.connect(DB_HOST)
  .then(() => {
    app.listen(3000);
    console.log('Database connection successful');
  })
  .catch (error => {
    console.log(error.message);
    process.exit(1);
  })
