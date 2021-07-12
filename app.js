const express = require('express')
const cors = require('cors')
const path = require('path')
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')
const { HttpCode } = require('./helpers/constants')
const { ErrorHandler } = require('./helpers/errorHandler')
const { apiLimit, jsonLimit } = require('./config/rate-limit.json')

const usersRouter = require('./routes/api/users')
const contactsRouter = require('./routes/api/contacts')

const app = express()

app.use(helmet())
app.use(cors())
app.use(express.json({ limit: jsonLimit }))

app.use(express.static(path.join(__dirname, '/public')))
app.use(
  '/api/',
  rateLimit({
    windowMs: apiLimit.windowMs, // 15 minutes
    max: apiLimit.max,
    handler: (req, res, next) => {
      next(
        new ErrorHandler(
          HttpCode.BAD_REQUEST,
          'Вы исчерпали количество запросов за 15 минут',
        ),
      )
    },
  }),
)

app.use('/api/users', usersRouter)
app.use('/api/contacts', contactsRouter)

app.use((req, res, next) => {
  res.status(HttpCode.NOT_FOUND).json({
    status: 'error',
    code: HttpCode.NOT_FOUND,
    message: `Use api on routes ${req.baseUrl}/api/contacts or ${req.baseUrl}/api/users`,
    data: 'Not Found',
  })
})

app.use((err, req, res, next) => {
  err.status = err.status ? err.status : HttpCode.INTERNAL_SERVER_ERROR
  res.status(err.status).json({
    status: err.status === 500 ? 'fail' : 'error',
    code: err.status,
    message: err.message,
    data: err.status === 500 ? 'Internal Server Error' : err.data,
  })
})

module.exports = app
