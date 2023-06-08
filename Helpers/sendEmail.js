const nodemailer = require("nodemailer");
const { EMAIL_PASS, SENDER_EMAIL } = process.env;
const config = {
  host: "smtp.ukr.net",
  port: 465,
  secure: true,
  auth: {
    user: SENDER_EMAIL,
    pass: EMAIL_PASS,
  },
};

const transporter = nodemailer.createTransport(config);

const sendEmail = async (data) => {
  const email = { ...data, from: SENDER_EMAIL };
  await transporter.sendMail(email);
  return true;
};

module.exports = sendEmail;
