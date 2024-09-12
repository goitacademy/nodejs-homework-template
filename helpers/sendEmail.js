const nodemailer = require("nodemailer");

const { META_USER, META_PASS, SENDER_EMAIL } = process.env;

const transport = nodemailer.createTransport({
  host: "smtp.meta.ua",
  port: 2525,
  auth: {
    user: META_USER,
    pass: META_PASS,
  },
});

function sendEmail(message) {
  message.from = SENDER_EMAIL;

  return transport.sendMail(message);
}

module.exports = sendEmail;
