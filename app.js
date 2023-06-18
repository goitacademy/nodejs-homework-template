const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
<<<<<<< Updated upstream
=======

const DB_HOST = "mongodb+srv://PavMor:Sobolivka1@cluster0.gydk4zo.mongodb.net/contacts_reader?retryWrites=true&w=majority";

mongoose.set('strictQuery', true);

mongoose.connect(DB_HOST)
  .then(()=> console.log("Database connect success"))
  .catch(error => console.log(error.message))
>>>>>>> Stashed changes

const contactsRouter = require('./routes/api/contacts')

const DB_HOST = "mongodb+srv://PavMor:Sobolivka1@cluster0.gydk4zo.mongodb.net/contacts_reader?retryWrites=true&w=majority"

mongoose.set('strictQuery', true)

mongoose.connect(DB_HOST)
  .then(()=> console.log("Database connect success"))
  .catch(error => console.log(error.message))
  
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
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app