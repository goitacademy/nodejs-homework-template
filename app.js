const express = require('express')
const logger = require('morgan')
const cors = require('cors')
require('dotenv').config();

const contactsRouter = require('./routes/api/contacts');
const app = express() // to create our app express server

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger)) // creatiion of middlewares, order is matter
app.use(cors())
app.use(express.json())

app.use('/api/contacts', contactsRouter)

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message })
})


module.exports = app;


