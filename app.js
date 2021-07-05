const express = require('express')
const logger = require('morgan')
const cors = require('cors')
require('dotenv').config()

const { errorHandler } = require('./helpers/apiHelpers')
const { NotFoundError } = require('./helpers/errors')

const usersRouter = require('./routes/usersRouter')
const contactsRouter = require('./routes/contactsRouter')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use('/users', usersRouter)
app.use('/api/contacts', contactsRouter)

app.use((req, res) => {
  throw new NotFoundError('Not found')
})

app.use(errorHandler)

module.exports = app
