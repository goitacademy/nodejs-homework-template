const express = require('express');
const logger = require('morgan');
const cors = require('cors');
require("dotenv").config();

const { authRouter, contactsRouter } = require('./routes');
const {URL} = require('./lib');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static('public'))

app.use(URL.users, authRouter)
app.use(URL.contacs, contactsRouter)

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  const {status = 500, message = 'Internal Server Error'} = err
  res.status(status).json({ message })
})

module.exports = app
