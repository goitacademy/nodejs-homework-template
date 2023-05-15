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

app.use('/api/contacts', contactsRouter);
app.use('/api/users', usersRouter);

module.exports = app;
