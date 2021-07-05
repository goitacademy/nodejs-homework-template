const express = require('express')
const logger = require('morgan')
const cors = require('cors')

const { authRouter } = require('./src/routes/users')
const { contactsRouter } = require('./src/routes/contacts')
const { avatarsRouter } = require('./src/routes/avatars')

const {errorHandler} = require('./src/helpers/apiHelpers')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use('/api/users', authRouter)
app.use('/api/contacts', contactsRouter)
app.use('/api/avatars', avatarsRouter)

app.use(errorHandler)

module.exports = app
