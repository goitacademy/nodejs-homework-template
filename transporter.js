const nodemailer = require('nodemailer');
require('dotenv').config();

const config = {
  host: 'smtp.meta.ua',
  port: 465,
  secure: true,
  auth: {
    user: 'victor.selischev.kh@meta.ua',
    pass: process.env.PASSWORD,
  },
};

const transporter = nodemailer.createTransport(config);

const emailOptions = {
  from: 'victor.selischev.kh@meta.ua',
  to: 'victor.selischev.kh@gmail.com',
  subject: 'Nodemailer test',
  text: 'Привет. Мы тестируем отправку писем! День второй',
};

transporter
  .sendMail(emailOptions)
  .then(info => console.log(info))
  .catch(err => console.log(err));
