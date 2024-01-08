const express = require('express')
const logger = require('morgan')
const cors = require('cors')
require('dotenv').config({
    path: `./envs/${process.env.NODE_ENV === 'development' ? 'development' : 'production'}.env`,
});

const {contactsRouter, usersRouter} = require('./routes')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())
app.use(express.static('public'))

const PATH_PREFIX = '/api'

app.use(`${PATH_PREFIX}/contacts`, contactsRouter)
app.use(`${PATH_PREFIX}/users`, usersRouter)

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  const { status = 500, message = 'Server error' } = err;
  res.status(status).json({ message })
})

module.exports = app
