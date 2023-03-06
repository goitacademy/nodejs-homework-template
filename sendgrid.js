require('dotenv').config();
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const msg = {
  from: 'victor.selischev.kh@gmail.com',
  to: 'victor.selischev.kh@meta.ua',
  subject: 'Nodemailer test',
  text: 'Привет. Мы тестируем отправку писем! День третий',
  html: '<strong>Привет. Мы тестируем отправку писем! День третий</strong>',
};

sgMail
  .send(msg)
  .then(() => {})
  .catch(err => {
    console.error(err);
  });
