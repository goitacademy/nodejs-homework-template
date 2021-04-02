const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const { codes } = require('./helpers/constants')
const contactsRouter = require('./routes/api/contacts')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use('/api/contacts', contactsRouter)

// app.use((req, res, next) => {
//   res.status(codes.NOT_FOUND).json({ status: 'error', code: codes.NOT_FOUND, message: 'Not found', data: 'Not found' })
// })

app.use((err, req, res, next) => {
  err.status = err.status ? err.status : codes.INTERNAL_SERVER_ERROR
  res.status(err.status).json({
    status: err.status === 500 ? 'Fail' : 'Error',
    code: err.status,
    message: err.message,
    data: err.status === 500 ? codes.INTERNAL_SERVER_ERROR : err.data
  })
})

module.exports = app
