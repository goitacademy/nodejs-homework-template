const express = require('express')
const logger = require('morgan')
const cors = require('cors')
// const uuid = require('uuid')
// const morgan = require('morgan')
const dotenv = require('dotenv')
const mongoose = require("mongoose");


dotenv.config({
  path: process.env.NODE_ENV === 'production' ? '.envs/production.env' : './envs/development.env'
});

const contactsRouter = require('./routes/api/contacts')
const favoritesRouter = require('./routes/api/favorites');
const app = express()

mongoose
  .connect( process.env.MONGO_URL)
  .then((con) => {
    console.log("Database connection successful");
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
  
if(process.env.NODE_ENV === 'development') app.use(logger('dev'));

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use('/api/contacts', contactsRouter)
app.use('/api/contacts/favorites', favoritesRouter);


app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message })
})

module.exports = app