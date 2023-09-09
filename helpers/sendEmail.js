const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (data) => {
  try {
    await sgMail.send(data);
    return true;
  } catch (error) {
    throw error;
  }
};

module.exports = sendEmail;