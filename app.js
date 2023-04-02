const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv')
const mongoose = require('mongoose');

dotenv.config({ path: './.env' });

const contactsRouter = require('./routes/api/contactsRoutes')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'


console.log(process.env.MONGO_URL)
mongoose.connect(process.env.MONGO_URL)
  .then((con) => {
    console.log('Database connection successful');
  })
  .catch((err) => {
    console.log(err);

    process.exit(1);
  });


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
