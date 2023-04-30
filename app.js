const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

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

app.use((error, requirement, response, next) => {
  response.status(500).json({ message: error.message })
})

module.exports = app