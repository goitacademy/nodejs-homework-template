
const mongoose = require('mongoose');
require('dotenv').config()
const uriDB = process.env.URI_DB

const db = mongoose.connect(uriDB, {
  useUnifiedTopology: true,
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: false  
})
mongoose.connection.on('connected', () => {
  console.log("Database connection successful")
})
mongoose.connection.on('error', (err) => {
  console.log(`Database connection error: ${err.message}`)
  process.exit()
})
process.on('SIGINT' , async () => {
  mongoose.connection.close(() => {
    console.log('Connection for DB sisconnected and app terminated')
    process.exit()
  }) 
})

module.exports = db
