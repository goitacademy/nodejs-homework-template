const nodemailer = require('nodemailer');
require('dotenv').config();

const sendMail = async ({to, subject, html}) => {
  const { META } = process.env;

  const nodemailerConfig = {
    host: 'smtp.meta.ua',
    port: 465,
    secure: true,
    auth: {
      user: 'trifonowden@meta.ua',
      pass: META,
    },
  };

  const transport = nodemailer.createTransport(nodemailerConfig);

  const email = {
    to,
    from: 'hw6',
    subject,
    html,
  };

  transport
    .sendMail(email)
    .then(() => console.log('email send succsess'))
    .catch(err => console.log('err.message :>> ', err.message));
};

module.exports = sendMail;
