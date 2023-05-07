const app = require('./app')
const dotenv = require('dotenv')
dotenv.config()
const mongoose = require("mongoose");
const {DB_HOST, PORT} = process.env

mongoose
  .connect(DB_HOST)
  .then(() =>
    app.listen(PORT, () => {
      console.log("Database connecti successful");
    })
  )
  .catch(() => process.exit(1));