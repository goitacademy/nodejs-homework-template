const mongoose = require('mongoose')
require('dotenv').config()
const uri = process.env.MONGO_URL

const db = mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
})

mongoose.connection.on('connected', () => {
  console.log('Database connection successful')
})

mongoose.connection.on('error', (error) => {
  console.log(`Mongoose connection error: ${error.message}`)
})

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected')
})

process.on('SIGINT', async () => {
  mongoose.connection.close(() => {
    console.log('Disconnected')
    process.exit(1)
  })
})

module.exports = db
