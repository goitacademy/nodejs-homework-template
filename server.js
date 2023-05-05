const app = require('./app')
const mongoose = require('mongoose')

const {DB_HOST} = process.env

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3000);
    console.log("Database connection successful");
  })
  .catch((err) => {
    console.log(err);
    process.env(1)
  });