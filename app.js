const express = require('express')
const logger = require('morgan')
const cors = require('cors')
require('dotenv').config()
const mongoose = require('mongoose')

const contactsRouter = require('./routes/api/contacts')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use('/api/contacts', contactsRouter)

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message })
})

const contactsDb = process.env.DB_HOST

const connection = mongoose.connect(contactsDb, {
  promiseLibrary: global.Promise,
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
})

connection.then(() => {
    app.listen(3000, function () {
      console.log(`Server running. Use our API on port: ${PORT}`)
    })
  })
  .catch((err) =>
    console.log(`Server not running. Error message: ${err.message}`),
  )

module.exports = app
