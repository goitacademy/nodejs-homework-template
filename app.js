const express = require('express')
const logger = require('morgan')
const cors = require('cors')
require("dotenv").config();

const contactsRouter = require('./routes/api/contacts')
const usersRouter = require('./routes/api/users')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

<<<<<<< HEAD
app.use('/api/contacts', contactsRouter)
app.use('/api/users', usersRouter)
=======
app.use('/', contactsRouter)
>>>>>>> master

<<<<<<< HEAD
app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((erro, req, res, next) => {
  const { status = 500, message = "Server error" } = erro;
  res.status(status).json({ message })
=======
app.use((requirement, response) => {
  response.status(404).json({ message: 'Not found' })
})

app.use((erro, requirement, response, next) => {
  const { status = 500, message = "Server error" } = erro;
  response.status(status).json({ message })
>>>>>>> master
})

module.exports = app
