const mongoose = require('mongoose');

const app = require('./app');

const { HOST_DB, PORT = 3000 } = process.env;

mongoose
  .connect(HOST_DB)
  .then(() => {
    app.listen(PORT);
    console.log('Database connection successful');
  })
  .catch(err => {
    console.log(err);
    process.exit(1);
  });
