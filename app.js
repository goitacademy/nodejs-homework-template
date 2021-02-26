const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const HttpCode = require('./helpers/status')

const contactsRouter = require('./routes/api/contacts')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use('/api/contacts', contactsRouter)

app.use((_req, res) => {
  res.status(HttpCode.NOT_FOUND).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  res
    .status(err.status || HttpCode.SERVER_ERROR)
    .json({ message: err.message || 'unknown error' })
})

module.exports = app
