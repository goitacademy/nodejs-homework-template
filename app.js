const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const path = require('path');

const contactsRouter = require('./routes/api/contacts')
// const contacts = path.join("data", "contacts.json")
// exports.contacts

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use('/api/contacts', contactsRouter)

app.get('/ping', (req, res) => {
  // res.status(201).send('<h1>HELLO FROM EXPRESS!!!</h1>');
  // res.sendStatus(200);

  res.status(200).json({
    msg: 'pong!',
  });
});

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message })
})

module.exports = app
