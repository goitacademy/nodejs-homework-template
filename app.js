const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose');
const serveStatic = require('serve-static')
require('dotenv').config();

const usersRoutes = require('./routes/api/usersRoutes')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('Database connected successfully'))
  .catch((error) => console.log(error));

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

require('./config/config-passport')

app.use(express.static('./public'))
app.use('/users', usersRoutes)

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message })
})

module.exports = app
