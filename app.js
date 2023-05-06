const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()

const contactsRouter = require('./routes/api/contacts')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(morgan(formatsLogger))
app.use(cors())
app.use(express.json())

app.use('/api/contacts', contactsRouter)

app.use((requirement, response) => {
  response.status(404).json({ message: 'Not found contact' })
})

app.use((erro, requirement, response, next) => {
  const {status = 500, message = "Server error"} = erro;
  response.status(status).json({ message, })
})

module.exports = app