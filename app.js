// 6aW8ACM88Ob9FowD, Sergey
const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')

const DB_HOST = "mongodb+srv://Sergey:6aW8ACM88Ob9FowD@cluster0.v3b1qey.mongodb.net/db-contacts"
mongoose.set('strictQuery', true)
mongoose.connect(DB_HOST)
.then(() => console.log('Connected to db-contacts'))
.catch(error => console.log(error.message))

const contactsRouter = require('./routes/api/contacts')

const app = express()

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
