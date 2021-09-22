const express = require('express')
const cors = require('cors')
const { usersRouter, ordersRouter } = require('./routes/api')

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/v1/users', usersRouter)
app.use('/api/v1/orders', ordersRouter)

app.use((_, res) => {
  res.status(404).json({
    status: 'error',
    code: 404,
    message: 'Not found',
  })
})

app.use((error, _, res, __) => {
  const { status = 500, message = 'Server error' } = error
  res.status(status).json({
    status: 'error',
    code: status,
    message,
  })
})

module.exports = app
