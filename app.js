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
  const code = err.code || 500
  res.status(code).json({
    status: code === 500 ? 'fail' : 'error',
    code: code,
    message:
      process.env.NODE_ENV === 'development'
        ? err.message
        : 'Something went wrong'
  })
})

module.exports = app
