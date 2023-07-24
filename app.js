const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const path = require('path');
require("dotenv").config();

const usersRouter = require(path.join(__dirname, 'routes', 'api', 'users'));
const contactsRouter = require(path.join(__dirname, 'routes', 'api', 'contacts'));

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())
app.use(express.static('public'))

app.use('/users', usersRouter)
app.use('/api/contacts', contactsRouter)

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  const { status=500, message="Server error"} = err
  res.status(status).json({ message })
})

module.exports = app
