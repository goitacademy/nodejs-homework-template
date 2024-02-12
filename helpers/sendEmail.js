const nodemailer = require("nodemailer");
require("dotenv").config();
const { GMAIL_PASSWORD, GMAIL_EMAIL } = process.env;

const nodemailerConfig = {
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: GMAIL_EMAIL,
    pass: GMAIL_PASSWORD,
  },
};
const transport = nodemailer.createTransport(nodemailerConfig);
// const email = {
//   to: "yevheniiahrytsu@gmail.com",
//   from: "ebuyhbib@gmail.com",
//   subject: "Verify email",
//   html: "",
// };
const sendEmail = async (data) => {
  const email = { ...data, from: GMAIL_EMAIL };
  await transport.sendMail(email);
};
module.exports = sendEmail;
