const sgEmail = require("@sendgrid/mail");
require("dotenv").config();

const { SENDGRID_API_KEY } = process.env;

sgEmail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (data) => {
  const email = { ...data, from: "velganvika@gmail.com" };
  await sgEmail.send(email);
  return true;
};

module.exports = sendEmail;
