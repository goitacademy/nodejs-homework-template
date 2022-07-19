/* eslint-disable no-useless-catch */
const sgMail = require("@sendgrid/mail");
require("dotenv").config();
const { SENDER_EMAIL } = process.env;

const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (data) => {
  try {
    const email = { ...data, from: `${SENDER_EMAIL}` };
    await sgMail.send(email);
    return true;
  } catch (error) {
    throw error;
  }
};

module.exports = sendEmail;
