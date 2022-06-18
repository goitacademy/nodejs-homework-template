const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const path = require('path')

const { HTTP_CODES, STATUS } = require('./helpers/constants')
const { json } = require('./config/limits.json')
const { appLimiter } = require('./helpers/appRateLimit')
const { contactsRouter } = require('./routes')
const { usersRouter } = require('./routes')

const app = express()

switch (app.get('env')) {
  case 'development':
    app.use(logger('dev'))
    break
  case 'production':
    app.use(logger('short'))
    break
  case 'test':
    break
  default:
    break
}

// const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'
// app.use(logger(formatsLogger))

app.set('trust proxy', 1)
app.use(helmet())

app.use(cors())
app.use(express.json({ limit: json.limit }))

app.use(express.static(path.join(process.cwd(), 'public')))

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

