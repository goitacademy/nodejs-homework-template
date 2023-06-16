const app = require('./app');
const mongoose = require('mongoose');

// 8*5bacBpf*y3hQU

const { DB_HOST } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3000);
    console.log('Database connection successful');
  })

  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
