const express = require('express');
const logger = require('morgan');
const cors = require('cors');
require('dotenv').config();

const contactsRouter = require('./routes/api/contacts')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use('/api/contacts', contactsRouter)

app.use((req, res) => {
  res.status(404).json({
    status: "error",
    message: 'Not found'
  })
})

app.use((err, req, res, next) => {
  const { status = 500, message = err.message } = err;
  res.status(status).json({
    status: "error",
    code: status,
    message
  });
});

module.exports = app
