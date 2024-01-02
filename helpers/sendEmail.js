const nodemailer = require("nodemailer");

require("dotenv").config();

const { UKR_NET_EMAIL, UKR_NET_PASSWORD } = process.env;

const config = {
  host: "smtp.ukr.net",
  port: 465,
  secure: true,
  auth: {
    user: UKR_NET_EMAIL,
    pass: UKR_NET_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
};

const transporter = nodemailer.createTransport(config);

const sendEmail = (emailOptions) => {
  const email = { ...emailOptions, from: UKR_NET_EMAIL };
  return transporter.sendMail(email);
};

module.exports = sendEmail;
