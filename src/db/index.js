const mongoose = require('mongoose')

require('dotenv-expand')(require('dotenv').config())

let uriDb = null

switch (process.env.NODE_ENV) {
  case 'test':
    uriDb = process.env.DB_HOST_TEST
    break
  case 'production':
  case 'development':
    uriDb = process.env.DB_HOST
    break
  default:
    throw new Error('DB_HOST config error')
}
const db = mongoose.connect(uriDb, {
  useUnifiedTopology: true,
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: false,
})

if (process.env.NODE_ENV !== 'test') {
  mongoose.connection.on('connected', _ => {
    console.info('Database connection successful.')
  })

  mongoose.connection.on('error', error => {
    console.info(`Database connection error: ${error.message}.`)
  })

  mongoose.connection.on('disconnected', _ => {
    console.info('Database disconnected.')
  })
}

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log(
      'Connection for Database disconnected and application terminated.',
    )
    process.exit(1)
  })
})
module.exports = db