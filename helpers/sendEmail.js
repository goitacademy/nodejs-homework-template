const sgMail = require('@sendgrid/mail');

require('dotenv').config();

const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async data => {
  const email = { ...data, from: 'alsteua@gmail.com' };

  try {
    await sgMail.send(email);
    console.log('email send success');
    return true;
  } catch (error) {
    console.log('error-sgMail:', error);
    throw error;
  }
};

module.exports = sendEmail;
