const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const cookieParser = require('cookie-parser');
require('dotenv').config();
// const {validateBody} = require('./utils');
const router = require('./routes/api')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/contacts', router)

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error!" } = err;
  res.status(status).json({ message })
})

module.exports = app
