const app = require('./app')
const mongoose = require('mongoose')
require('dotenv').config()

const { MONGO_CLOUD_CONNECT } = process.env

mongoose
  .connect(MONGO_CLOUD_CONNECT)
  .then(() => {
    console.log('Database connection successful')
    app.listen(3000, () => { console.log("Server running. Use our API on port: 3000") })
  })
  .catch((error) => {
    console.error("Couldn't connect to the database")
    process.exit(1)
})