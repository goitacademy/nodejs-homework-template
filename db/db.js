const mongoose = require('mongoose')
require('dotenv').config()
const urlDb = process.env.URL_DB

const db = mongoose.connect(urlDb, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  maxPoolSize: 5,
})

mongoose.connection.on('connected', (e) => {
  console.log('Database connection successful')
})

process.on('SIGINT', async () => {
  mongoose.connection.close(() => {
    process.exit(1)
  })
})

module.exports = db
