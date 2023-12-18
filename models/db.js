const mongoose = require('mongoose')
require('dotenv').config()

const uriDB = process.env.URI_DB || 'mongodb://127.0.0.1:27017/test' // Використовуйте URI_DB, або за замовчуванням localhost, якщо URI_DB не визначений

const db = mongoose.connect(uriDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

mongoose.connection.on('connected', () => {
  console.log('Mongoose connection to db')
})

mongoose.connection.on('error', (err) => {
  console.log(`Mongoose connection error ${err.message}`)
})

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected')
})

process.on('SIGINT', async () => {
  await mongoose.connection.close()
  console.log('Connection to db closed and app termination')
  process.exit(1)
})

module.exports = db
