const path = require('path')
const express = require('express')
const logger = require('morgan')
const cors = require('cors')
require('dotenv').config()

const contactsRouter = require('./routes/api/contacts')
const authRouter = require('./routes/api/auth')
const usersRouter = require('./routes/api/users')
const imagesRouter = require('./routes/api/images')

const { HttpCode } = require('./helpers/constants')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(
  '/images',
  express.static(path.join(process.cwd(), process.env.AVATARS_OF_USERS))
)
app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use('/api/contacts', contactsRouter)
app.use('/api/auth', authRouter)
app.use('/api/users', usersRouter)
app.use('/images', imagesRouter)

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  err.status = err.status ? err.status : HttpCode.INTERNAL_SERVER_ERROR
  res.status(err.status).json({
    status: err.status === HttpCode.INTERNAL_SERVER_ERROR ? 'fail' : 'error',
    code: err.status,
    message: err.message,
    data:
      err.status === HttpCode.INTERNAL_SERVER_ERROR
        ? 'INTERNAL SERVER ERROR'
        : err.data,
  })
})

module.exports = app
