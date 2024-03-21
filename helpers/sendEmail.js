// const sgMail = require("@sendgrid/mail");
const nodemailer = require("nodemailer");
require("dotenv").config();

const { SENDGRIT_API_KEY, GMAIL_PASSWORD } = process.env;

// sgMail.setApiKey(SENDGRIT_API_KEY);

const nodemailerConfig = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: "yashenov@meta.ua",
    pass: GMAIL_PASSWORD,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

// const sendEmail = async (data) => {
//   const email = { ...data, from: "yashenov.x@gmail.com" };
//   await sgMail.send(email);
//   return true;
// };

module.exports = transport;
