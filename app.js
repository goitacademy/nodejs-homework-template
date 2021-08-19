const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const ErrorException = require('./exceptions/error.exception');

const contactsRouter = require('./routes/api/contacts')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use('/api/contacts', contactsRouter)

app.use((_,__, next) => next(ErrorException.NotFound))

app.use((err, req, res, next) => {
  const statusCode = err.status || 500;
  res.status(statusCode).json({
    message: err.message,
    ...(err.errors ? {errors : err.errors} : {})
  })
})

module.exports = app
