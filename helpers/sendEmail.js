const nodemailer = require("nodemailer");
require("dotenv").config();

const {META_PASSWORD} = process.env;

const nodemailerConfig = {
    host : "smtp.meta.ua",
    port : 465,
    secure : true,
    auth : {
        user: 'sofiko1102@meta.ua',
        pass: META_PASSWORD, 
    }
};

const transport = nodemailer.createTransport(nodemailerConfig);

const sendEmail = async data => {
    const email = { ...data, from: 'sofiko1102@meta.ua' };
    await transport
      .sendMail(email)
      .then(() => console.log('Email send success'))
      .catch(error => console.log(error.message));
    return true;
  };
  
  module.exports = sendEmail;