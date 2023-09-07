const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { SENDGRID_KEY } = process.env;

sgMail.setApiKey(SENDGRID_KEY);

const sendEmail = async (data) => {
  const email = { ...data, from: "petro.shutak.ua@gmail.com" };
  await sgMail.send(email);
  console.log("Email sent");
  return true;
};

module.exports = sendEmail;