const mongoose = require('mongoose')

require('dotenv').config()
const uriDb = process.env.URI_DB

const dbContacts = mongoose.connect(uriDb, {
  useNewUrlParser: true,
  // useUnifiedTopology: true,
  // useFindAndModify: false,
})

mongoose.connection.on('connecned', () => {
  console.log('Database connection successful')
})

mongoose.connection.on('error', (err) => {
  console.log(`Database connection error: [${err.message}]`)
  process.exit(1)
})

mongoose.connection.on('disconnected', () => {
  console.log(`Database disconnected`)
})

process.on('SIGINT', async () => {
  await mongoose.connection.close()
  console.log('Connection for DB disconnected and app terminated')
  process.exit(1)
})

module.exports = dbContacts
