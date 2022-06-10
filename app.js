const express = require('express')
const logger = require('morgan')
const cors = require('cors')
require('dotenv').config()

const contactsRouter = require('./routes/api/contacts')
const usersRouter = require('./routes/api/user')
const app = express()

app.use(logger(process.env.NODE_ENV === 'dev' ? 'dev' : 'tiny'))
app.use(cors())
app.use(express.json())

app.use('/api/users', usersRouter)
app.use('/api/contacts', contactsRouter)

app.use((req, res, next) => {
  next({status: 404, message: 'Not Found'})
})

app.use((err, req, res, next) => {
  const { status = 500, message = 'Internal Server Error' } = err
  res.status(status).json({ message })
})

module.exports = app
