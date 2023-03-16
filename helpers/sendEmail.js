const nodemailer = require("nodemailer");
require("dotenv").config();

const { UKRNET_PASSWORD } = process.env;

const nodemailerConfig = {
  host: "smtp.ukr.net",
  port: 465,
  secure: true,
  auth: { user: "303vlad@ukr.net", pass: UKRNET_PASSWORD },
};

const transport = nodemailer.createTransport(nodemailerConfig);

const sendEmail = async (data) => {
  const email = {
    ...data,
    from: "303vlad@ukr.net",
  };
  await transport.sendMail(email);
  return true;
};

module.exports = sendEmail;
