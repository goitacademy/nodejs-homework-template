const nodemailer = require('nodemailer');
require('dotenv').config();

const { META_EMAIL, META_PASSWORD } = process.env;


const nodemailerConfig = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: META_EMAIL,
    pass: META_PASSWORD,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

const sendEmail = async (data) => {
  const mail = { ...data, from: META_EMAIL };
  await transport.sendEmail(mail);
  return true;
};

module.exports = sendEmail;









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