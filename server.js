const mongoose = require('mongoose');

require('dotenv').config();

const app = require('./app');

const { MONGO_URL, PORT = 3000 } = process.env;

mongoose.connect(MONGO_URL)
  .then(() => {
    app.listen(PORT)
    console.log('Database connection successful')
  })
  .catch(error => {
    console.log(error.message)
    process.exit(1);
  })
