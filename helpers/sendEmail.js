
const sgMail = require("@sendgrid/mail");
require("dotenv").config();


const { SENGRID_API_KEY } = process.env;

sgMail.setApiKey(SENGRID_API_KEY);

const sendEmail = async (data) => {
  const email = { ...data, from: "olichkamovchan@ukr.net" };
  await sgMail.send(email);
  return true;
};
module.exports = sendEmail;

