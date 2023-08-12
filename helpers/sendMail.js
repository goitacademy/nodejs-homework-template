const nodemailer = require('nodemailer');
require('dotenv').config();

const { META_EMAIL, META_PASSWORD } = process.env;


const nodemailerConfig = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: META_EMAIL,
    pass: META_PASSWORD
  }
};

const transport = nodemailer.createTransport(nodemailerConfig);


const sendMail = async (data) => {
  const mail = { ...data, from: META_EMAIL };
  await transport.sendMail(mail);
  return true;
}

module.exports = sendMail;





// const sgMail = require('@sendgrid/mail')
// sgMail.setApiKey(process.env.SENDGRID_API_KEY)
// const msg = {
//   to: 'roxolana96@meta.ua', // Change to your recipient
//   from: 'roxolana96@meta.ua', // Change to your verified sender
//   subject: 'Sending with SendGrid is Fun',
//   text: 'and easy to do anywhere, even with Node.js',
//   html: '<strong>and easy to do anywhere, even with Node.js</strong>',
// }
// sgMail
//   .send(msg)
//   .then(() => {
//     console.log('Email sent')
//   })
//   .catch((error) => {
//     console.error(error)
//   })







// const sgMail = require("@sendgrid/mail");
// require("dotenv").config();

// const {SENDGRID_API_KEY} = process.env;

// sgMail.setApiKey(SENDGRID_API_KEY);

// const sendEmail = async (data) => {
//     const email = {...data, from: "...@gmail.com"};
//     await sgMail.send(email);
//     return true;
// }

// module.exports = sendEmail;



