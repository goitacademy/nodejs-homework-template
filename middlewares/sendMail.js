const nodemailer = require("nodemailer");
const { EMAIL_USER, EMAIL_PASS } = process.env;

const sendMail = async ({ to, subject, html }) => {
  const from = "andryukhamelnyk@gmail.com";
  // const from = "info@mycontacts.com";

  const email = {
    to,
    from,
    subject,
    text: "and easy to do anywhere, even with Node.js",
    html,
  };

  const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 25,
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
  });

  await transport.sendMail(email);
};

module.exports = sendMail;
