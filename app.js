const express = require('express');
const logger = require('morgan');
const cors = require('cors');

const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const { DB_HOST } = process.env;

// const DB_HOST =
//   'mongodb+srv://Konstantin:UpWppv9JEbFTNO6U@cluster0.zwki0.mongodb.net/phonebook_oline?retryWrites=true&w=majority';

mongoose
  .connect(DB_HOST)
  .then(() => console.log('data open'))
  .catch(error => {
    console.log(error.message);
    process.exit(1);
  });

// const contactsRouter = require('./routes/api/contacts');

// const app = express();

// const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

// app.use(logger(formatsLogger));
// app.use(cors());
// app.use(express.json());

// app.use('/api/contacts', contactsRouter);

// app.use((req, res) => {
//   res.status(404).json({ message: 'Not found' });
// });

// app.use((err, req, res, next) => {
//   const { status = 500, message = `Server error. ${err.message}` } = err;
//   //   const { status = 400, message = 'BedRequest' } = err;
//   res.status(status).json({
//     status: 'error',
//     code: status,
//     message: err.message,
//   });
// });

// module.exports = app;
