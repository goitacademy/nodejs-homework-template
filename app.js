const express = require('express');
require('dotenv').config();
const logger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');

const contactsRouter = require('./routes/api/contacts');

const {PORT = 3000, DB_HOST} = process.env;

mongoose.set('strictQuery', true);

const app = express();

(async () => {
  await mongoose.connect(DB_HOST)
    .then(() => console.log('Database connection successful'))
    .catch(e => {
      console.log(e.message);
      process.exit(1);
    });

  const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

  app.use(logger(formatsLogger));
  app.use(cors());
  app.use(express.json());

  app.use('/api/contacts', contactsRouter);

  app.use((req, res) => {
    res.status(404).json({message: 'Not found'});
  });

  app.use((err, req, res, next) => {
    const {status = 500, message = 'Server error'} = err;
    res.status(status).json({message});
  });

  app.listen(PORT, () => {
    console.log(`Server running. Use our API on port: ${PORT}`);
  });
})();
