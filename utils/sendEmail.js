const nodemailer = require('nodemailer');
require('dotenv').config();

const { GMAIL_USER, GMAIL_API_KEY, BASE_URL } = process.env;

const sendEmail = async (email, verificationToken) => {
  const nodemailerConfig = {
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: GMAIL_USER,
      pass: GMAIL_API_KEY,
    },
  };

  const transport = nodemailer.createTransport(nodemailerConfig);

  const sendLetter = {
    to: email,
    from: GMAIL_USER,
    subject: 'Verify email',
    html: `<p>
    <a target="_blank" href=${BASE_URL}/users/verify/${verificationToken}>Click here to verify your email</a>
  </p>`,
  };

  const verificationMail = await transport
    .sendMail(sendLetter)
    .then(() => console.log('Email send success'))
    .catch(err => console.log(err));

  return verificationMail;
};

module.exports = sendEmail;
