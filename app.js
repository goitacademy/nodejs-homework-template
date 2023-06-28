const express = require('express')
const logger = require('morgan')
const cors = require('cors')

const contactsRouter = require('./routes/api/contacts')
/* const { listContacts } = require('./models/contacts') */

/* const path = require('node:path');
const contactsPath = path.join(__dirname, './models/contacts.json'); */

const app = express()

app.get('/api', (request, responce) => {
  responce.send('<h1>Contacts page</h1>')
});

app.get('/api/contacts', (request, responce) => {
/*   const allContacts = await listContacts(); */
      /* console.table(allContacts); */
  /* responce.send(allContacts) */
  /* responce.json(contactsPath); */
/*   responce.send(contactsPath) */
});

app.get('/api/contacts/:id', (request, responce) => {
  console.log(request.url)
  console.log(request.method)
  responce.send('Contacts page ID')
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
