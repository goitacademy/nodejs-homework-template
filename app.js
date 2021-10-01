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

app.use('/api/auth', authRouter)

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message })
})

module.exports = app
