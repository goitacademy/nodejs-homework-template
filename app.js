const express = require('express')
const logger = require('morgan')
const cors = require('cors')

const contactsRouter = require('./routes/api/contacts')
const authRouter = require('./routes/authorization/users')
const { errorHandler } = require('./helpers/apiHelpers')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use('/api/contacts', contactsRouter)
app.use('/api/users', authRouter)

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use(errorHandler)

module.exports = app
