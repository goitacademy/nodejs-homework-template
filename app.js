const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const dotenv = require('dotenv')
const mongoose = require('mongoose')

dotenv.config({ path: './.env'})

const contactsRouter = require('./routes/api/contacts')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

mongoose.connect(process.env.DB_HOST).then(() => {
  console.log(process.env.DB_HOST)
  console.log("Database connection successful")
}).catch((err) => {
  console.log(err);
  process.exit(1);
})

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use('/contacts', contactsRouter)

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message })
})

module.exports = app
