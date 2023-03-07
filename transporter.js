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
const verificatePath =
  'localhost:3000/api/users/verify/25393254-edb4-4765-9666-dab45edd9e70';

const emailOptions = {
  from: 'victor.selischev.kh@meta.ua',
  to: 'victor.selischev.kh@gmail.com',
  subject: 'Nodemailer test',
  text: 'Привет. Мы тестируем отправку писем! День второй',
  html: `<h3>Hello! Please <a target="_blank" href="${verificatePath}">verificate your account.</a></h3>`,
};

transporter
  .sendMail(emailOptions)
  .then(info => console.log(info))
  .catch(err => console.log(err));
