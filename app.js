const express = require('express')
const logger = require('morgan')
const cors = require('cors')

const authRouter = require('./routes/api/auth')
const contactsRouter = require('./routes/api/contacts')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())
app.use(express.static("public"))

app.use('/api/auth', authRouter);
app.use('/api/contacts', contactsRouter)

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message, })
})

// SendGrid mail =====
const sgMail = require('@sendgrid/mail')
require('dotenv').config()
const { SENDGRID_API_KEY } = process.env;
sgMail.setApiKey(SENDGRID_API_KEY);

const email = {
  to: 'serhiyak@ukr.net',
  from: 'kudryavtsev.sergiy@gmail.com',
  subject: 'verify email',
  html: '<p>Test email</p>',
};

sgMail.send(email)
  .then(() => { 
    console.log('Mail sent successfully');
  })
  .catch(err => { 
    console.log(err.message);
  })
// ======

module.exports = app
