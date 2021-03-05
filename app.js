const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const app = express()

const contactsRouter = require('./routes/api/contacts')
const usersRouter = require('./routes/api/users')

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use('/api/contacts', contactsRouter)
app.use('/api/users', usersRouter)

app.get('/', (req, res) => {
  res.send(req.query)
})

module.exports = app
