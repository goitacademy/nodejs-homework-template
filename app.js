const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const http = require("./helpers/status.js")
const contactsRouter = require('./routes/api/contacts')
const usersRouter = require('./routes/api/users')
const cookieParser = require('cookie-parser')
const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use(express.static('public'));

app.use('/api/contacts', contactsRouter)
app.use('/api/users', usersRouter)

app.use((req, res, next) => {
  res.status(http.NOT_FOUND).json({
    status: "error",
    code: http.NOT_FOUND,
    message: 'Not found', 
  })
})

app.use((err, req, res, next) => {
  err.status = err.status ? err.status : http.SERVER_ERROR
  res.status(http.SERVER_ERROR)
    .json({
      status: err.status === 500 ? 'fail': 'error',
      code: err.status,
      message: err.message,
      data: err.status === 500 ? 'Server Error' : err.data,
    })
})

module.exports = app
