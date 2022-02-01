const sgMail = require('@sendgrid/mail');
require('dotenv').config();


const { SENDGRID_KEY , EMAIL} = process.env;

sgMail.setApiKey(SENDGRID_KEY);

const sendEmail = async (data) => {
  try {
    const email = { ...data, from: EMAIL };
    await sgMail.send(email);
    return true;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.body);
    }
    console.error(error.response.body);
  }
};
module.exports = sendEmail;