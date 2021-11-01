const express = require('express')
const logger = require('morgan')
const cors = require('cors')

const app = express()

const contactsRouter = require('./routes/api/contacts/contacts')

const formatLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatLogger))
app.use(cors())

// if the request has a body then execute json.parse()(string json to object)
app.use(express.json())

app.use('/api/contacts', contactsRouter)

app.use((req, res) => {
  res.status(404).json({
    message: 'not found',
  })
})

// If the error handler has 4 arguments, then express will pass it to the 1st
app.use((err, req, res, next) => {
  const { status = 500, message = 'Server error' } = err
  res.status(status).json({ message })
})

module.exports = app
