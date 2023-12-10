require("dotenv").config();

const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASSWORD,
  },
});

function emailSend(message) {
  message.from = "19wiltor69@gmail.com";
  return transport.sendMail(message);
}

module.exports = emailSend;
