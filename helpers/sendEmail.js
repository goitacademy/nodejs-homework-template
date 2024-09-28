const nodemailer = require("nodemailer");
require("dotenv").config();

const {GMAIL_PASSWORD} = process.env;

const nodemailerConfig = {
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
      user: "gc1965dn@gmail.com",
      pass: GMAIL_PASSWORD
  }
};

const transport = nodemailer.createTransport(nodemailerConfig);

const email = {
  to: "gc-dn@ukr.net",
  from: "gc1965dn@gmail.com",
  subject: "Test email",
  html: "<p><strong>Test email</strong> from localhost:3000</p>"
};

const sendEmail = async (data) => {
    const email = {...data, from: "gc1965dn@gmail.com"};
    await transport.sendMail(email);
    return true;
};

module.exports = sendEmail;