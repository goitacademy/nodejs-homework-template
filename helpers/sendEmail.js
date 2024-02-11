const nodemailer = require('nodemailer');

const { API_KEY } = process.env;


const nodemailderConfig = {
    host: 'smtp.mailgun.org',
    port: 587,
    secure: true,
    auth: {
      user:'sosikanna5@gmail.com',
      pass: API_KEY
    },
  };
  
  const transport = nodemailer.createTransport(nodemailderConfig);
  
  const sendEmail = async data => {
    const email = {
      ...data,
      from: 'sosikanna5@gmail.com'
    };
    try {
      await transport.sendMail(email);
      return true;
    } catch (error) {
      console.log(error);
    }
  };
  
  module.exports = sendEmail;