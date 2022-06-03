const mongoose = require('mongoose')

require('dotenv-expand')(require('dotenv').config())

const uriDb = process.env.DB_HOST

const db = mongoose.connect(uriDb, {
  useUnifiedTopology: true,
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: false,
})

mongoose.connection.on('connected', _ => {
  console.info('Database connection successful.')
})

mongoose.connection.on('error', error => {
  console.info(`Database connection error: ${error.message}.`)
})

mongoose.connection.on('disconnected', _ => {
  console.info('Database disconnected.')
})

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log(
      'Connection for Database disconnected and application terminated.',
    )
    process.exit(1)
  })
})

module.exports = db