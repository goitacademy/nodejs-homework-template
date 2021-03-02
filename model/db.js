require('dotenv').config()
const mongoose = require('mongoose')
mongoose.Promise = global.Promise

mongoose.connect(process.env.DB_HOST, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
})

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function() {
  console.log('Connection opened')
})
db.on('disconnected', () => {
  console.log('Mongoose Disconnected!')
})

process.on('SIGINT', async() => {
  await db.close()
  console.log('Connection closed')
  process.exit(1)
})

module.exports = db
