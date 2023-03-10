require('dotenv').config();
const path = require('path');
const sgMail = require('@sendgrid/mail');

const sendMail = (email, verificationToken) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const verificatePath = path.join(
    'http://localhost:3000',
    '/api',
    `/users/verify/${verificationToken}`
  );

  console.log(verificatePath);

  const msg = {
    from: 'victor.selischev.kh@gmail.com',
    to: email,
    subject: 'Please Verificate',
    text: 'Hello! Please verificate your account.',
    html: `<h3>Hello! Please <a target="_blank" href="${verificatePath}">verificate your account.</a></h3>`,
  };

  sgMail
    .send(msg)
    .then(() => {})
    .catch(error => console.error(error.message));
};

module.exports = { sendMail };
