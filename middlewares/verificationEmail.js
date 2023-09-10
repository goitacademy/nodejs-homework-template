const sgMail = require('@sendgrid/mail');
require('dotenv').config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const send = (email, verificationToken) => {
  const msg = {
    to: email,
    from: process.env.MAIL_USER,
    subject: 'Email Verification',
    html: `Please click the link below to verify your email:<br>http://localhost:3000/api/users/verify/${verificationToken}`,
  }

  sgMail
    .send(msg)
    .then(() => {
      console.log('Verification Email sent')
    })
    .catch((error) => {
      console.error(error)
    })
};

module.exports = {
  send,
};