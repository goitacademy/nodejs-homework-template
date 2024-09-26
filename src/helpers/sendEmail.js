const nodemailer = require('nodemailer');
require('dotenv').config();

const { EMAIL_PASSWORD, EMAIL_FROM } = process.env;

const { MAILTRAP_PASSWORD, MAILTRAP_USER } = process.env;

// const transport = nodemailer.createTransport({
//   host: 'smtp.meta.ua',
//   port: 465,
//   secure: true,
//   auth: {
//     user: EMAIL_FROM,
//     pass: EMAIL_PASSWORD,
//   },
// });
// мета мене закинула в спам

const transport = nodemailer.createTransport({
  host: 'sandbox.smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: MAILTRAP_USER,
    pass: MAILTRAP_PASSWORD,
  },
});
// MAILTRAP в тестовому режимі не відправляє листи а зберігає їх в своїй системі

const sendEmail = async (data) => {
  const email = { ...data, from: EMAIL_FROM };
  await transport.sendMail(email);
  return true;
};

module.exports = sendEmail;
