const mongoose = require('mongoose');
require('dotenv').config();

const app = require('./app');

const { DB_HOST, PORT = 3000 } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log('Database connection successful');

    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  })
  .catch(error => {
    console.error(`Failed to launch application with error ${error.message}`);
    process.exit(1);
  });
