const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  host: 'smtp.ukr.net',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_NAME,
    pass: process.env.PASSWORD_FOR_EMAIL,
  },
});

const mailer = message => {
  transporter.sendMail(message, err => {
    if (err) {
      return console.log(err);
    }
  });
};

module.exports = mailer;
