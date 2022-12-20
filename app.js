// ipHweWpFjsYKfOl2

const mongoose = require('mongoose');

const dotenv = require('dotenv');
dotenv.config();

const { DB_HOST } = process.env;

mongoose.connect(DB_HOST)
  .then(() => console.log("Database connection successful"))
  .catch((error) => console.log(error.message));

const express = require('express')
const logger = require('morgan')
const cors = require('cors')

const contactsRouter = require('./routes/api/contacts')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use('/api/contacts', contactsRouter)

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  const { status = 500, message = "Service error" } = err;
  res.status(status).json({ message: message })
})

module.exports = app
