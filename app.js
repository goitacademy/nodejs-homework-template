const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

const app = express()
const contactsRouter = require('./routes/api/contacts')
const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'
dotenv.config()

const runServer = async () => {
  try {
    await mongoose.connect(process.env.URI_DB, {
      promiseLibrary: global.Promise,
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    console.log('Database connection is successful')

    app.use(logger(formatsLogger))
    app.use(cors())
    app.use(express.json())

    app.use('/api/contacts', contactsRouter)

    app.use((req, res) => {
      res.status(404).json({ message: 'Contact is not found' })
    })

    app.use((err, req, res, next) => {
      res.status(500).json({ message: err.message })
    })
  } catch (err) {
    process.exit(1)
  }
}

runServer()

module.exports = app