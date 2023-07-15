
const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const contactsRouter = require('./routes/api/contacts')
const DB_HOST = "mongodb+srv://Yaroslav:0442062697Yh@cluster0.zbgpvpo.mongodb.net/contacts?retryWrites=true&w=majority"
const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'
mongoose.connect(DB_HOST).then(()=> console.log("success")).catch(error => console.log(error.message))
app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())
// eslint-disable-next-line no-undef
//app.use(upload.none());

app.use('/api/contacts', contactsRouter)

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message })
})

module.exports = app
