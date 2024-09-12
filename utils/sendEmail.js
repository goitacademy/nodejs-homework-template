const nodemailer = require("nodemailer");

require("dotenv").config();
const { UKRNET_TOKEN } = process.env;

const nodemailerConfig = {
  host: "smtp.ukr.net",
  port: 465,
  secure: true,
  auth: {
    user: "valentinepylypchuk@ukr.net",
    pass: UKRNET_TOKEN,
  },
};


const transport = nodemailer.createTransport(nodemailerConfig);

const sendVerificationEmail = async (data) => {
  const email = { ...data, from: "valentinepylypchuk@ukr.net" };

  await transport.sendMail(email).then(() => console.log("Email send success"));

  return true;
};

module.exports = sendVerificationEmail;
