const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { SENDGRID_KEY } = process.env;

sgMail.setApiKey(SENDGRID_KEY);

const sendEmail = async (data) => {
  const email = { ...data, from: "geri-grej2023@rambler.ru" };
  await sgMail.send(email);
  return true;
};

module.exports = sendEmail;
