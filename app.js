const express = require('express')
const logger = require('morgan')
const cors = require('cors')
require('dotenv').config()

const {contactsRouter} = require('./routes/api/contactsRouter')
const {authRouter} = require('./routes/api/authRouter')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use('/api/contacts', contactsRouter)
app.use('/api/auth', authRouter)

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  console.log(err)
  res.status(err.statusCode || 500).json({ message: err.message || 'Something went wrong, please try again later.'})
})

module.exports = {app}
