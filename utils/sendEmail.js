const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { SENDGRID_APP_KEY } = process.env;

sgMail.setApiKey(SENDGRID_APP_KEY);

const sendEmail = async (data) => {
  const email = { ...data, from: "autovolna@gmail.com" };
  await sgMail.send(email);
  return true;
};

module.exports = sendEmail;
