const sgMail = require("@sendgrid/mail");
require("dotenv");

const { SENDGRID_API_KEY, FROM_EMAIL } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (data) => {
  const msg = { ...data, from: FROM_EMAIL };
  await sgMail.send(msg);
  return true;
};

module.exports = sendEmail;
