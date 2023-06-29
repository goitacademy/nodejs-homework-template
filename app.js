const express = require('express')
const logger = require('morgan')
const cors = require('cors')

const contactsRouter = require('./routes/api/contacts')
const { listContacts, getContactById } = require('./models/contacts')

const app = express()

app.get('/api', (request, responce) => {
  responce.status(200);
});

app.get('/api/contacts', async (request, responce) => {
  const allContacts = await listContacts();
  responce.status(200).json(allContacts);
});

app.get('/api/contacts/:id', async (request, responce) => {
  const allContacts = await getContactById();
  responce.status(200).json(allContacts);
});

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use('/api/contacts', contactsRouter)

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message })
})

module.exports = app
