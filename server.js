const app = require('./app');
const mongoose = require('mongoose');
require('dotenv').config();

const { DB_HOST, PORT = 3000 } = process.env;

mongoose.connect(DB_HOST)
  .then(() => {
    console.log('Database connection successful');
    app.listen(PORT);
  })
  .catch((e) => {
    console.log(e.message);
    process.exit(1);
  })
