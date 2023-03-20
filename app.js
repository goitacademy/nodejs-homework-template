const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({ path: './.env' });

const contactRouter = require('./routes/api/contactsRouts')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

mongoose.connect(process.env.DB_URL)
// mongoose.connect('mongodb+srv://Kitty-Litty:KittiLitti951@contacts-db.pjdnlel.mongodb.net/db-contacts')
  .then(() => {
  console.log('Database connection successful')
  }).catch((err) => {
    console.log(err);

    process.exit(1);
}); 

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use('/api/contacts', contactRouter)

/**
 * Handle "not found" requests
 */
app.all('*', (req, res) => {
  res.status(404).json({
    msg: 'Not Found!',
  });
});

/**
 * Global error handler (middleware with 4 params)
 */
app.use((err, req, res, next) => {
  const { status } = err;

  // if no status code, send 500 (internal server error)
  res.status(status || 500).json({
    msg: err.message,
  });
});

module.exports = app
