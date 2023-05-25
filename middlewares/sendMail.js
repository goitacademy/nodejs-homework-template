const nodemailer = require("nodemailer");
const { EMAIL_USER, EMAIL_PASS } = process.env;

const sendMail = async ({ to, subject, html }) => {
  const from = "andryukhamelnyk@gmail.com";
  const email = {
    to,
    from,
    subject,
    text: "and easy to do anywhere, even with Node.js",
    html,
  };

  const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
  });

  await transporter.sendMail(email);
};

module.exports = sendMail;
