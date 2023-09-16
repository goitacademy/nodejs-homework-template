const express = require('express')
const router = express.Router()
const logger = require('morgan')
const cors = require('cors')
const fs = require("fs")

function listContacts() {
  const data = fs.readFileSync('./models/contacts.json')
  return JSON.parse(data);
}

const contactsRouter = require('./routes/api/contacts')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

const contacts = listContacts()

app.use('/api/contacts', contactsRouter)

app.get('/api/contacts', (req, res) => {
  try {
    res.status(200).json(contacts)
  } catch (err) {
    res.status(500).json({ err: 'Internal Server Error' })
  }
})

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message })
})

module.exports = app
