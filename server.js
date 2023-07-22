const mongoose = require('mongoose');

const app = require('./app');
const DB_URL = require('./DB_URL');

mongoose
  .connect(DB_URL)
  .then(() => {
    console.log('Mongo DB successfully connected..');

    app.listen(3000, () => {
      console.log('Server running. Use our API on port: 3000');
    });
  })
  .catch((err) => {
    console.log(err);

    process.exit(1);
  });
