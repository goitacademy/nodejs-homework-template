const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')

require('dotenv').config()
const { DB_HOST } = process.env

const { sendResponse } = require('./helpers')

const authRouter = require('./routes/api/auth')
const contactsRouter = require('./routes/api/contacts')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use('/api/auth', authRouter)
app.use('/api/contacts', contactsRouter)

app.use((req, res) => {
  sendResponse({ res, status: 404, statusMessage: 'error', data: { message: 'Not found' } })
})

app.use((error, _, res, __) => {
  const { status = 500 } = error
  sendResponse({ res, status, statusMessage: 'error', data: { message: 'Server error' } })
})

mongoose.connect(DB_HOST, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Database connection successful')
})
  .catch(error => {
    console.log(error.message)
    process.exit(1)
  })

module.exports = app
