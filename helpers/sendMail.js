const nodemailer = require("nodemailer");
const { EMAIL_USER, EMAIL_PASS } = process.env;
async function sendMail({ to, html, subject }) {
  const mail = {
    from: "infousers@movies.com",
    to,
    html,
    subject,
  };
  const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
  });
  await transport.sendMail(mail);
}
module.exports = sendMail;
