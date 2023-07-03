const express = require('express')
const logger = require('morgan')
const cors = require('cors')
// const mongoose = require("mongoose")

// const DB_HOST = "mongodb+srv://CuzImBatman:xpvNGJnyeMDGzVwg@cluster0.vosysd9.mongodb.net/db-contacts?retryWrites=true&w=majority"

// mongoose.connect(DB_HOST).then(() => console.log('Database connection successful')).catch(error => console.log(error.message))


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
  const {status = 500, message = "server error"} = err;
  res.status(500).json({ message, })
})

module.exports = app
