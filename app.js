const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({ path: './.env'});

const contactsRouter = require('./routes/api/contacts');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

mongoose
.connect(process.env.MONGO_URL)
.then((connection) => {
  console.log('Database connection successful');
})
.catch((error) => {
  console.log(error);

  process.exit(1);
});

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use('/api/contacts', contactsRouter);

app.all('*', (req, res) => {
  res.status(404).json({ message: 'Not found' })
});

app.use((error, req, res, next) => {
  const msg = Array.isArray(error.message) ? error.message.join(';') : error.message;
  
   res.status(error.status || 500).json({ 
    msg,
    stack: error.stack
    });
});

module.exports = app;