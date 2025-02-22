const nodemailer = require("nodemailer");

require("dotenv").config();
const { PASSWORD } = process.env;
const nodemailerConfig = {
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "e3d28fcde2b466",
    pass: PASSWORD,
  },
};
const transport = nodemailer.createTransport(nodemailerConfig);
function sendEmail(message) {
  const email = { ...message, from: "l.stesko@ukr.net" };
  return transport.sendMail(email);
}
module.exports = sendEmail;
