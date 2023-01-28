const mongoose = require('mongoose');
const app = require('./app');
require('dotenv').config();

mongoose.Promise = global.Promise;

const PORT = process.env.PORT || 3000;
const DB_HOST = process.env.DB_HOST;

mongoose.connect(DB_HOST)
.then(() => {
  console.log("Database connection successful");

  app.listen(PORT, () => {
    console.log(`Server running. Use our API on port: ${PORT}`)
  })
})
.catch(err => {
  console.log(err.message);
  process.exit(1);
})