const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.mailgun.org",
  port: 587,
  secure: false,
  auth: {
    user: process.env.M_USER,
    pass: process.env.M_PASS,
  },
});

const emailSender = async (html, subject, to) => {
  await transporter.sendMail({
    from: '"Phonebook" <company@gmail.com>',
    to,
    subject,
    html,
  });
};

module.exports = { emailSender };
