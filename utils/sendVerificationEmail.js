const sgMail = require("@sendgrid/mail");
const { HttpError } = require("../helpers");
require("dotenv").config();

const { SENDGRID_API_KEY, SENDGRID_SENDER } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendVerificationEmail = async (data) => {
  try {
    const email = { ...data, from: SENDGRID_SENDER };
    return await sgMail.send(email);
  } catch (error) {
    throw HttpError();
  }
};

module.exports = sendVerificationEmail;
