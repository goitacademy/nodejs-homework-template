const express = require('express')
const logger = require('morgan')
const cors = require('cors')
require('dotenv').config();

const contactsRouter = require('./routes/api/contacts')
const authRouter = require('./routes/auth');
const { httpError } = require('./helpers');

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use('/api/contacts', contactsRouter)
app.use('/users', authRouter);

app.use((req, res, next) => {
  next(httpError(404, 'Not Found'));
})

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
})

module.exports = app;
