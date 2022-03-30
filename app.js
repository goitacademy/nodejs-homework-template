const express = require('express')
const logger = require('morgan')
const cors = require('cors')

require('dotenv').config()

const { sendError } = require('./middlewares')

const {apiRouter} = require('./routes')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use('/api/auth', apiRouter.authRouter)
app.use('/api/contacts', apiRouter.contactsRouter)
app.use('/avatars', express.static('./public/avatars'))

app.use(sendError)

module.exports = app
