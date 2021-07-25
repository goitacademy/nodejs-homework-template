const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const path = require('path')
const cloudinary = require('cloudinary').v2
require('dotenv').config()
require('./configs/config-passport')

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true
})

const app = express()

const api = require('./routes/api')

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use(express.static(path.join(__dirname, './public/avatars')))

app.use('/api/v1/contacts', api.contacts)
app.use('/api/v1/auth', api.auth)
app.use('/api/v1/users', api.users)

app.use((_, res, __) => {
  res.status(404).json({
    status: 'error',
    code: 404,
    message: 'Use api on routes: /api/v1/contacts',
    data: 'Not found'
  })
})

app.use((err, _, res, __) => {
  console.log(err.stack)
  res.status(500).json({
    status: 'fail',
    code: 500,
    message: err.message,
    data: 'Internal Server Error',
  })
})

const uriDb = process.env.DB_HOST
const PORT = process.env.PORT || 3001

const connection = mongoose.connect(uriDb, {
  promiseLibrary: global.Promise,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
})

connection
  .then(() => {
    app.listen(PORT, function () {
      console.log(`Server running. Use our API on port: ${PORT}`)
    })
  })
  .catch((err) =>
    console.log(`Server not running. Error message: ${err.message}`),
  )

module.exports = app
