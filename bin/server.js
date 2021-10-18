const mongoose = require('mongoose')
require('dotenv').config()
const app = require('../app')

const { URL_DB, PORT = 3000 } = process.env

mongoose.connect(URL_DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => app.listen(PORT, () => {
    console.log(`Server running. Use our API on port: ${PORT}`)
  }))
  .catch(error => {
    console.log(`Server not running. Error message: ${error.message}`)
    process.exit(1)
  })

mongoose.connection.on('connected', () => {
  console.log('Database connection successful')
})

mongoose.connection.on('error', (err) => {
  console.log(`\x1B[31m Database connection error: ${err.message}`)
})

mongoose.connection.on('disconnected', () => {
  console.log('\x1b[34m Database disconnected')
})
