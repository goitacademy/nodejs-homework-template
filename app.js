// Ek-2rFr7qy3ASB

const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose')
const dotenv = require('dotenv')

const contactsRouter = require('./routes/api/contacts')

dotenv.config();

const {DB_HOST} = process.env;

const app = express();
mongoose.set('strictQuery', true);
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
