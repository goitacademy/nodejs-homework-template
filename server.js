const mongoose = require("mongoose");

const app = require('./app');

require("dotenv").config();

const {DB_HOST, PORT = 3000} = process.env;

mongoose.set('strictQuery', true);

mongoose.connect(DB_HOST)
  .then(() => {
    app.listen(PORT)
    console.log("Database connection successful");
  })
  .catch(error => {
    console.log(error.message);
    process.exit(1);
  });


// gy9sbg3kKwTxmhxN

// mongodb+srv://Iuliia23:gy9sbg3kKwTxmhxN@cluster0.89bbcts.mongodb.net/

// const DB_HOST = mongodb+srv://Iuliia23:gy9sbg3kKwTxmhxN@cluster0.89bbcts.mongodb.net/db-contacts?retryWrites=true&w=majority
