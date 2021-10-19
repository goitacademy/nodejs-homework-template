const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const contactsRouter = require('./routes/api/contacts')
const { StatusCode } = require('./config/constants')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use('/api/contacts', contactsRouter)

app.use((_req, res) => {
  res.status(StatusCode.NOT_FOUND).json({ message: 'Not found' })
})

app.use((err, _req, res, _next) => {
  res.status(StatusCode.SERVER_ERROR).json({ message: err.message })
})

module.exports = app
