const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const boolParser = require('express-query-boolean');
const rateLimit = require("express-rate-limit")
const { HttpCode } = ('./helpers/constants.js')

const contactsRouter = require('./routes/contacts')
const usersRouter = require('./routes/users')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(helmet())
app.use(logger(formatsLogger))

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  handler: (req, res, next) => {
    return res.status(HttpCode.TOO_MANY_REQUESTS).json({
      status: 'error',
      code: HttpCode.TOO_MANY_REQUESTS,
      message: 'Too many requests',
    })
  },
});

//  apply to all requests
app.use(limiter);

app.use(cors({
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  preflightContinue: false,
  optionsSuccessStatus: 204,
}),
)

app.use(express.json( { limit: 100000 })) // 100 Kb for json
app.use(boolParser())

app.use('/api/users', usersRouter)
app.use('/api/contacts', contactsRouter)

app.use((req, res) => {
  res.status(HttpCode.NOT_FOUND).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  const status = err.status || HttpCode.INTERNAL_SERVER_ERROR
  res.status(status || HttpCode.INTERNAL_SERVER_ERROR).json({
    status: status === HttpCode.INTERNAL_SERVER_ERROR ? 'fail' : 'error',
    code: status,
    message: err.message
  })
})

module.exports = app
