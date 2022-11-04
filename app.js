const express = require('express');
const logger = require('morgan');
const cors = require('cors');
require('dotenv').config();

const authRouter = require('./routes/api/auth');
const contactsRouter = require('./routes/api/contacts');

const app = express();

const formatsLogger =
  app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/contacts', contactsRouter);
app.use(express.static('public'));

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  const { status = 500, message = 'Server error' } = err;
  res.status(status).json({ message });
});

module.exports = app;

// name
// "Chaim Lewis"
// email
// "dui.in@egetlacus.ca"
// phone
// "(294) 840-6685"

// const nodemailer = require('nodemailer');
// require('dotenv').config();

// const { META_PASSWORD } = process.env;

// const nodemailerConfig = {
//   host: 'smtp.meta.ua',
//   port: 465,
//   secure: true,
//   auth: {
//     user: '',
//     pass: META_PASSWORD,
//   },
// };

// const transport = nodemailer.createTransport(nodemailerConfig);

// const email = {
//   to: '',
//   from: '',
//   subject: '',
//   html: ``,
// };

// transport
//   .sendMail(mail)
//   .then(() => console.log('Email send success'))
//   .catch((e) => console.log(e.message));
