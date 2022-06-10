const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const helmet = require('helmet')

const { HTTP_CODES, STATUS } = require('./helpers/constants')
const { json } = require('./config/limits.json')
const { appLimiter } = require('./helpers/appRateLimit')
const { contactsRouter } = require('./routes')
const { usersRouter } = require('./routes')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.set('trust proxy', 1)
app.use(helmet())
app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json({ limit: json.limit }))
app.use('/api/', appLimiter)
app.use('/api/v1/contacts', contactsRouter)
app.use('/api/v1/users', usersRouter)

app.use((req, res) => {
  res.status(HTTP_CODES.NOT_FOUND).json({
    status: STATUS.ERROR,
    code: HTTP_CODES.NOT_FOUND,
    hint: `Use API on routes ${req.baseUrl}/api/contacts`,
    message: 'Not found',
  })
})

app.use((err, req, res, next) => {
  err.status = err.status || HTTP_CODES.INTERNAL_SERVER_ERROR
  res.status(err.status).json({
    status:
      err.status === HTTP_CODES.INTERNAL_SERVER_ERROR
        ? STATUS.FAIL
        : STATUS.ERROR,
    code: err.status,
    message: {
      message:
        err.status === HTTP_CODES.INTERNAL_SERVER_ERROR
          ? 'Internal Server Error'
          : err.message,
      'message-alt': err.message,
    },
  })
})

module.exports = app

