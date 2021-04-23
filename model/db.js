const mongoose = require('mongoose')
require('dotenv').config()

const { DB_URI } = process.env

const db = mongoose.connect(DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
  poolSize: 5
})

mongoose.connection.on('error', err => {
  console.log(`Db error: ${err.message}`)
  console.log('App will be terminated')
  process.exit(1)
})

mongoose.connection.on('open', () => {
  console.log('Connected to DB successfully')
})

mongoose.connection.on('disconnected', () => {
  console.log('Disconnected from BD')
})

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('DB connection is closed. App will be closed.')
    process.exit(1)
  })
})

module.exports = db
