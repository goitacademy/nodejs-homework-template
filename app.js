// yWiZ5FFqiGYOBdAn

const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose'); const contactsRouter = require('./routes/api/contacts')

const { DB_HOST } = require('./config');
const app = express()

mongoose.connect(DB_HOST)
  .then(() => console.log('Database connection successful'))
  .catch(err => console.log(err.message));
const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json()) // middleware express.json() смотрит тело запроса в каком формате пришло 

app.use('/api/contacts', contactsRouter)

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message })
})

module.exports = app
