const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const { errorHandler, pathError } = require('./errorHelpers/apiHelpers')

const contactsRouter = require('./router/api/contactsRouter')
const authRouter = require('./router/api/authRouter')
const filesRouter = require('./router/api/filesRouter')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use('/api/contacts', contactsRouter)
app.use('/api/users', authRouter)
app.use('/avatars', filesRouter)
app.use(errorHandler)

app.use(pathError)

module.exports = app
