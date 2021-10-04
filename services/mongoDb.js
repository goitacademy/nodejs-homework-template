const mongoose = require('mongoose')
require('dotenv').config()

const DB_HOST = process.env.DB_HOST

const mongoDbConnect = mongoose.connect(DB_HOST, {
  useUnifiedTopology: true,
})

mongoose.connection.on('connected', () => {
  console.log('Database connection successful')
})

mongoose.connection.on('error', (err) => {
  console.log(`Database connection error: ${err.message}`)
})

mongoose.connection.on('disconnected', () => {
  console.log('Database disconnected.')
})

process.on('SIGINT', async () => {
  await mongoose.connection.close()
  process.exit(1)
})

module.exports = mongoDbConnect
