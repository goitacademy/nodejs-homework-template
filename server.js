const {app} = require('./app')
require('dotenv').config()
const mongoose = require('mongoose')

const PORT = process.env.PORT || 8081

mongoose
  .connect(process.env.DB_HOST)
  .then(_ => {
    app.listen(PORT)
    console.log("Database connection successful")
  })
  .catch((error) => {
    console.log(error.message)
    process.exit(1)
  })
