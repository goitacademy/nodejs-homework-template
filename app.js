const express = require('express')
const logger = require('morgan')
const cors = require('cors')
require('dotenv').config();


const contactsRoutes = require('./routes/api/contactsRoutes');
const userRoutes = require('./routes/api/userRoutes');

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use('/api/contacts', contactsRoutes);
app.use('/api/users', userRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  let {status = 500, message = "Server Error"} = err;
    if (message.includes('ENOENT')) {
      message = "Server Error";
    }

    res.status(status).json({message});
})

module.exports = app
