
const mongoose = require('mongoose');
require('dotenv').config()

const uriDb = process.env.URI_DB

const db = mongoose.connect(uriDb, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex:true,
  poolSize: 5,
});

mongoose.connection.on('connected', ()=> console.log("Database connection successful"))

mongoose.connection.on('error', (err) => {
  client.close()
  console.log(`Mongoose error:${err.message}`);
  process.exit(1)
})

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
})

process.on('SIGINT', async () => {
  mongoose.connection.close(() => {
    client.close()
    console.log('connection  to DB closed and app terminated');
    process.exit(1)
  })
})


module.exports = db