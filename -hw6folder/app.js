const express = require('express')
const cors = require('cors')
// const nodemailer = require('nodemailer') // sendMail
// require('dotenv').config()               // sendMail
const { usersRouter, ordersRouter } = require('./routes/api')

const app = express()

// // < sendMail
// const { EMAIL_PASSWORD, EMAIL_USER, EMAIL_TO } = process.env

// /* Створюєм налаштування nodemailerConfig */
// const nodemailerConfig = {
//   // host: 'smtp.gmail.com', //'smtp.meta.ua', // 'smtp.gmail.com' 587
//   // port: 587, // 25, 465, 2255
//   // //connectTimeout: 10000
//   // secure: true, // для 465 - true;  для 25, 2255 - false;

//   host: 'smtp.meta.ua',
//   port: 465, // 25, 465, 2255
//   secure: true, // для 465;  для 25, 2255 - false;
//   auth: {
//     user: EMAIL_USER,
//     pass: EMAIL_PASSWORD,
//   },
// }

// /* Об'єкт який пересилає нашу почту:  за налаштуванням nodemailerConfig */
// const transporter = nodemailer.createTransport(nodemailerConfig)
// // < це як у sendgrid ...
// const email = {
//   to: EMAIL_TO,
//   from: EMAIL_USER,
//   subject: 'Реєстрація на сайті',
//   html: '<p>Вітаємо з успішною реєстрацією на нашому сайті</p>',
// }
// // >

// transporter.sendMail(email)
//   .then(() => console.log('Email success send'))
//   .catch((error) => console.log(error.message))
// // > sendMail

app.use(cors())
app.use(express.json())

app.use('/api/v1/users', usersRouter)
app.use('/api/v1/orders', ordersRouter)
// POST - /api/v1/users/register (signup)
// POST - /api/v1/users/login    (signin)
// GET - /api/v1/users/logout   (signout)

app.use((_, res) => {
  res.status(404).json({
    status: 'error',
    code: 404,
    message: 'Not found',
  })
})

app.use((error, _, res, __) => {
  const { status = 500, message = 'Server error' } = error
  res.status(status).json({
    status: 'error',
    code: status,
    message,
  })
})

module.exports = app
