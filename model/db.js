const mongoose = require('mongoose')

require('dotenv').config()
const urlDb = process.env.URL_DB

const db = mongoose.connect(urlDb, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
})

mongoose.connection.on('connected', () => {
  console.log('Database connection successful')
})

mongoose.connection.on('eroor', (err) => {
  console.log(`Mongoose connection error: ${err.message}`)
})

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected')
})

process.on('SIGINT', async () => {
  await mongoose.connection.close()
  console.log('Connection for db closed and app terminated')
  process.exit(1)
})

module.exports = db
