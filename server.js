const mongoose = require("mongoose");

const app = require('./app')

require("dotenv").config();

const {DB_HOST, PORT = 3000} = process.env;

mongoose.set('strictQuery', true);

mongoose.connect(DB_HOST)
  .then(() => {
    app.listen(PORT, (() => {
      console.log(`Server is running on ${PORT} port`)
      console.log("Database connection successful")
    }))
  })
  .catch(error => {
    console.log(error.message);
    process.exit(1);
  })