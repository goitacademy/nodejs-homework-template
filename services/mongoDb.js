const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()

const URI = process.env.DB_URI

const mongoDbConnect = mongoose.connect(URI, {
  useNewUrlParcer: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
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
