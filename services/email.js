const nodemailer = require('nodemailer');
require('dotenv').config();
const Mailgen = require('mailgen');

const setServiceLink = env => {
  let link = null;
  switch (env) {
    case 'development':
      link = `http://localhost:${process.env.PORT}` || 'http://localhost:3000';
      break;
    case 'production':
      link = process.env.LINK;
      break;
    default:
      link = `http://localhost:${process.env.PORT}` || 'http://localhost:3000';
      break;
  }
  return link;
};

const createTemplateVerifyEmail = (verifyToken, userEmail) => {
  const serviseLink = setServiceLink(process.env.NODE_ENV);
  const mailGenerator = new Mailgen({
    theme: 'cerberus',
    product: {
      name: 'Contacts book',
      link: serviseLink,
    },
  });
  const email = {
    body: {
      name: userEmail,
      intro:
        "Welcome to Contacts book! We're very excited to have you on board.",
      action: {
        instructions: 'To get started with Contacts book, please click here:',
        button: {
          color: '#22BC66', // Optional action button color
          text: 'Confirm your account',
          link: `${serviseLink}/api/users/verify/${verifyToken}`,
        },
      },
    },
  };
  const emailBody = mailGenerator.generate(email);
  return emailBody;
};

const sendVerifyEmail = (email, verifyToken) => {
  const config = {
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
      user: process.env.EMAIL_SENDER,
      pass: process.env.PASSWORD,
    },
  };
  const transporter = nodemailer.createTransport(config);
  const emailOptions = {
    from: process.env.EMAIL_SENDER,
    to: email,
    subject: 'Verify email',
    html: createTemplateVerifyEmail(verifyToken, email),
  };
  transporter
    .sendMail(emailOptions)
    .then(info => console.log(info))
    .catch(err => console.log(err));
};

module.exports = { sendVerifyEmail };