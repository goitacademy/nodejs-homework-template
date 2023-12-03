const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS,
  },
});


function sendEmail(message) {
  message.from = "akulina.alina1999@gmail.com";
  return transport.sendMail(message);
}

module.exports = sendEmail;
