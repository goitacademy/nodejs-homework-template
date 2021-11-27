const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { SENDGRID_API_KEY } = process.env;
sgMail.setApiKey(SENDGRID_API_KEY);

const sendMail = async (data) => {
  const email = { ...data, from: "dukadmytro72@gmail.com" };
  await sgMail.send(email);
  return true;
};

module.exports = sendMail;
