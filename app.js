const express = require('express')
const logger = require('morgan')
const cors = require('cors')

require('dotenv').config();

const contactsRouter = require('./routes/api/contacts')
const usersRouter = require('./routes/api/users')

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use('/api/contacts', contactsRouter)
app.use('/api/users', usersRouter)

app.use((req, res) => {
  res.status(404).json({ message: 'Not found 404' })
})

app.use((err, req, res, next) => {
  const { status = 500, message = 'Service error' } = err;
  res.status(status).json({ message: message })
})

module.exports = app
