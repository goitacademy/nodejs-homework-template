// Ek-2rFr7qy3ASB

const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');

const contactsRouter = require('./routes/api/contacts')

const DB_HOST = 'mongodb+srv://Andrii:Ek-2rFr7qy3ASB@cluster0.mmeks8d.mongodb.net/contacts_reader?retryWrites=true&w=majority'

const app = express();

mongoose.connect(DB_HOST)
.then( () => console.log('Database connect success'))
.catch( error => console.error(error.massage)) 

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
