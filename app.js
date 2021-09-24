const express = require('express')
const logger = require('morgan')
const cors = require('cors')

const contactsRouter = require('./routes/api/contacts')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use('/api/contacts', contactsRouter)

app.use((err, req, res, next) => {
  if (err.name === 'ValidationError') {
    return res
      .status(400)
      .json({ status: 'error', code: 400, message: err.message })
  }
  if (err.message === '404') {
    return res
      .status(404)
      .json({ status: 'error', code: 404, message: 'Not found' })
  } else {
    return res
      .status(500)
      .json({ status: 'error', code: 500, message: err.message })
  }
})

module.exports = app
