const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const { status } = require('./status');
const s = require('chalk');


require('dotenv').config();


const contactsRouter = require('./routes/api/contacts')

const app = express()

const formatsLogger = process.env.NODE_ENV === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use('/api/contacts', contactsRouter)

app.use((req, res) => {
  res.status(status.NOT_FOUND).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  res.status(status.INTERNAL_SERVER_ERROR).json({ message: err.message })
})

module.exports = app
