// aYaeu4mnDd8J7yM2

// mongodb+srv://Dima:aYaeu4mnDd8J7yM2@cluster0.spyu3.mongodb.net/test

// mongodb+srv://Dima:aYaeu4mnDd8J7yM2@cluster0.spyu3.mongodb.net/phone_book?retryWrites=true&w=majority

const express = require('express')
const logger = require('morgan')
const cors = require('cors')
require('dotenv').config();

const contactsRouter = require('./routes/api/contacts');
const usersRouter = require('./routes/api/users');

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use('/api/users', usersRouter);
app.use('/api/contacts', contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message })
})

module.exports = app
