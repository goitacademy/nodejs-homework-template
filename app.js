const express = require('express')
const logger = require('morgan')
const cors = require('cors')

const contactsRouter = require('./src/routes/api/contacts')
const usersRouter = require('./src/routes/api/users')
const HTTP_CODS = require('./src/helpers/httpCodes')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use('/api/contacts', contactsRouter)
app.use('/api/users', usersRouter)


app.use((_req, res) => {
  res
  .status(HTTP_CODS.BAD_REQUEST)
  .json({ message: 'Not found' })
})

app.use((err, _req, res, _next) => {
  res
  .status(HTTP_CODS.INTERNAL_SERVER_ERROR)
  .json({ message: err.message })
})

module.exports = app
