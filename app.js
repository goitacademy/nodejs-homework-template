// Anastasia
// PKgAr7tWmDdJoamv
// mongodb+srv://Anastasia:PKgAr7tWmDdJoamv@cluster0.ptu4v.mongodb.net/nodejs-homework-template?retryWrites=true&w=majority


const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const DB_HOST = "mongodb+srv://Anastasia:PKgAr7tWmDdJoamv@cluster0.ptu4v.mongodb.net/nodejs-homework-template?retryWrites=true&w=majority"

mongoose.connect(DB_HOST).then(() => {
  // app.listen(3000)
}).catch(err => {
console.log(err.message)
// process.exit(1)
})

const {contactsRouter} = require('./routes/api')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use('/api/contacts', contactsRouter)

app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    code: 404,
    message: 'Not found',
  })
})

app.use((err, req, res, next) => {
  const {status = 500, message = 'Server error'} = err
  res.status(status).json({message})
})

module.exports = app
