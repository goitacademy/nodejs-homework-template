const app = require('./app');
const mongoose = require('mongoose');
require('dotenv').config();

const { DB_KEY, PORT = 3000 } = process.env;

mongoose
  .connect(DB_KEY)
  .then(res => {
    console.log('Database connection successful');
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  })
  .catch(err => {
    console.log(err);
    process.exit(1);
  });
