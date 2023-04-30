const app = require('./app')
const dotenv = require('dotenv')
dotenv.config()
const mongoose = require("mongoose");
const {DB_HOST} = process.env

mongoose
  .connect(DB_HOST)
  .then(() =>
    app.listen(3000, () => {
      console.log("Database connection successful");
    })
  )
  .catch(() => process.exit(1));