const express = require('express');
const cors = require('cors');
// eslint-disable-next-line import/no-extraneous-dependencies
const dotenv = require('dotenv');
const morgan = require('morgan');
// eslint-disable-next-line import/no-extraneous-dependencies
const mongoose = require('mongoose');

dotenv.config({
  path:
    process.env.NODE_ENV === 'production'
      ? './environments/production.env'
      : './environments/development.env',
});

const contactRoutes = require('./routes/contactRoutes');

const app = express();

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

// MONGODB CONNECTION ======================================
mongoose
  .connect(process.env.MONGO_URL)
  .then((con) => {
    console.log('Mongo DB successfully connected..');
  })
  .catch((err) => {
    console.log(err);

    process.exit(1);
  });

// MIDDLEWARES ==============================================
app.use(express.json());
app.use(cors());

/**
 * custom general middleware to sign time string to req object
 */
app.use((req, res, next) => {
  req.time = new Date().toLocaleString('uk-UA');

  next();
});

// /cars
// req.body { type: 'petrol' }
// req.query baseURL/cars?type=petrol

// ROUTES ===============================================
app.use('/api/contacts', contactRoutes);

app.get('/ping', (req, res) => {
  // res.status(201).send('<h1>HELLO FROM EXPRESS!!!</h1>');
  // res.sendStatus(200);

  res.status(200).json({
    msg: 'pong!',
  });
});

/**
 * Not found request handler.
 */
app.all('*', (req, res) => {
  res.status(404).json({
    msg: 'Oops! Resource not found..',
  });
});

/**
 * Global error handler. Four arguments required!!
 */
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    msg: err.message,
  });
});

// SERVER INIT =====================================================
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});
