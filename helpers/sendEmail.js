const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendMail = async (datd) => {
  const email = { ...datd, from: "infernokgg@gmail.com" };
  await sgMail.send(email);
  return true;
};

module.exports = sendMail;
