
const mongoose = require('mongoose')

require('dotenv').config()
const uriDB = process.env.URI_DB
//mongoose.Promise = global.Promise
const db = mongoose.connect(uriDB, {
  promiseLibrary: global.Promise,
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
})
mongoose.connection.on('error', (err) => {
  console.log(`Mongoose connection error: ${err.message}`);
})
mongoose.connection.on('connected', (err) => {
  console.log(`Mongoose connected`);
})
mongoose.connection.on('disconnected', (err) => {
  console.log(`Mongoose disconnected`);
})
process.on('SIGING', ()=> {
  console.log('Connection for DB disconnected and app terminated');
  process.exit(1)
})

module.exports = db