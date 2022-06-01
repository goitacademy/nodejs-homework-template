const mongoose = require('mongoose')
require('dotenv').config()

const uriDb = process.env.DB_HOST

const db = async () => {
  return await mongoose.connect(uriDb,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
      poolSize: 5,
    })
}

mongoose.connection.on('connected', (_) => {
  console.info('\x1b[92m%s\x1b[0m', 'Database connection successful')
})

mongoose.connection.on('error', (error) => {
  console.info('\x1b[91m%s\x1b[0m', `Database connection error: ${error.message}`)
})

mongoose.connection.on('disconnected', (_) => {
  console.info('\x1b[94m%s\x1b[0m', 'Database disconnected')
})

process.on('SIGINT', async () => {
  mongoose.connection.close(() => {
    console.info('\x1b[35m%s\x1b[0m', 'Connection to DB closed and app termination')
    process.exit(1)
  })
})

module.exports = db
