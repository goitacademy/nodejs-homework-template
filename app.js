const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config(); // запись содержимого из .env (ключ доступа) в process.env
const { DB_HOST } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log('Database connection successful');
  })
  .catch(error => {
    console.log(error.message);
    process.exit(1);
  });

const contactsRouter = require('./routes/api/contacts');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json()); // нужно для отправки тела запроса в формате json

// ====================================
// const contactsServices = require('./model/index');
// async function test() {
//   const result = await contactsServices.updateContact('10', {
//     name: 'Chaim Lewisqqqqqqq',
//     email: 'dui.in@egetlacus.ca',
//     phone: '(294) 840-6685',
//   });
//   console.log(result);
// }
// test();
// ===================================

app.use('/api/contacts', contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((error, req, res, next) => {
  const { status = 500, message = 'Server error' } = error;
  res.status(status).json({ message });
});

module.exports = app;
