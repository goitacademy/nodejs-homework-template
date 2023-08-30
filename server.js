const mongoose = require('mongoose');

const app = require('./app');

require("dotenv").config();

const {DB_HOST} = process.env;


mongoose.set('strictQuery', true);

mongoose
  .connect(DB_HOST)
  .then(() => console.log("Database connection successful"))
  .then(() => app.listen(3000, () => {
    console.log("Server running. Use our API on port: 3000")
  }))
  .catch(error => {
    console.log(`Server not running. Error message: ${error.message}`);
    process.exit(1);
  })