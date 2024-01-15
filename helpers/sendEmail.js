const nodemailer = require('nodemailer');

require('dotenv').config();

const config = {
  host: 'smtp.meta.ua',
  port: 465,
  secure: true,
  auth: {
    user: 'victoriya23071@meta.ua',
    pass: process.env.PASSWORD,
  },
};

const transport = nodemailer.createTransport(config);
const sendEmail = async(data)=> {
  const email = {...data, from: 'victoriya23071@meta.ua'};
  await transport.sendMail(email);
  return true;
};

module.exports = sendEmail;