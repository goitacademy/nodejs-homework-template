const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const path = require('path');
const contactsRouter = require('./routes/api/contacts')

const app = express()

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

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
