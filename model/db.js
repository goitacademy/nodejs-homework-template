const mongoose = require('mongoose')

require('dotenv').config()

const uriDb = process.env.URI_DB

const db = mongoose.connect(uriDb, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  poolSize: 5,
})

mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to DB')
})

mongoose.connection.on('error', (err) => {
  console.log(`Mongoose connection error: ${err.message}`)
  process.exit(2)
})

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected')
})

process.on('SIGINT', async () => {
  mongoose.connection.close(() => {
    console.log('Disconnect MongoDB')
    process.exit(2)
  })
})

module.exports = db