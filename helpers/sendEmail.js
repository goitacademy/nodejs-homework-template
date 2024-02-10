require("dotenv").config();

const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "627a2c2a70fd31",
    pass: "25dc7428232b34",
  },
});

function sendEmail(message) {
  return transport.sendMail(message);
}

module.exports = sendEmail;