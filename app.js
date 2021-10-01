const express = require('express')
const logger = require('morgan')
const cors = require('cors')

const authRouter = require('./routes/api/users')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

// app.use((req, res) => {
//   res.status(404).json({
//     status: 'error',
//     code: 404,
//     message: 'Not Found',
//   })
// })

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use('/api/users', authRouter)

app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    code: 404,
    message: 'Not Found',
  })
})

app.use((error, req, res, next) => {
  const { status = 500, message = 'Server error' } = error
  res.status(status).json({
    status: 'error',
    code: status,
    message,
  })
})

module.exports = app
