const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')

require('dotenv').config()
const { DB_HOST } = process.env

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

app.use((error, _, res, __) => {
  const { status = 500, message = 'Server error' } = error
  res.status(status).json({
    status: 'error',
    code: status,
    message
  })
})
// app.use((err, req, res, next) => {
//   res.status(500).json({ message: err.message.replace(/"/g, '') })
// })

mongoose.connect(DB_HOST, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Database connection successful')
})
  .catch(error => {
    console.log(error.message)
    process.exit(1)
  })

module.exports = app
