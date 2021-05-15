const mongoose = require('mongoose')
require('dotenv').config()
const uriDb = process.env.URI_DB

const db = mongoose.connect(uriDb, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
  poolSize: 5,
})
mongoose.connection.on('connected', (err) => {
  console.log(`Database connection successful`)
})

mongoose.connection.on('error', (err) => {
  console.log(`Mongoose connection error: ${err.message}`)
})
mongoose.connection.on('disconnected', (err) => {
  console.log(`Mongoose disconnected`)
})

// закрываем соеденение с нашей БД
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Disconnect MongoDB')
    process.exit(1)
  })
})

module.exports = db
