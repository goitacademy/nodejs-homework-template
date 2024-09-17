const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (data) => {
  const mail = { ...data, from: "anna.velichko@meta.ua" };
  await sgMail.send(mail);
  return true;
};

module.exports = sendEmail;
