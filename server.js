const app = require('./app')
const mongoose = require('mongoose')
require('dotenv').config()

const MONGO_URL = process.env.MONGO_URL
const PORT = process.env.PORT

const connection = mongoose.connect(MONGO_URL)

connection
  .then(() => {
    console.log('Database connection successful')

    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`)
    })
  })
  .catch((err) => {
    console.log(`Server not running. Error message: ${err.message}`)
    process.exit(1)
  })
