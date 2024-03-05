const nodemailer = require("nodemailer");

require("dotenv").config();

const PORT = process.env.PORT || 3000;
const BASE_URL = `http://localhost:${PORT}`;
const { SENDER_KEY, PASS_KEY } = process.env;

const sendVerificationEmail = async (email, verificationToken) => {
  const config = {
    host: "smtp.mailgun.org",
    port: 587,
    auth: {
      user: SENDER_KEY,
      pass: PASS_KEY,
    },
  };

  const transporter = nodemailer.createTransport(config);
  const linkToVerifyEmail = `${BASE_URL}/users/verify/${verificationToken}`;
  const emailOptions = {
    from: "ronnie00bk@gmail.com",
    to: email,
    subject: "Verify Your Email",
    text: `Please confirm your email address by clicking the following link ${linkToVerifyEmail}`,
  };

  return await transporter.sendMail(emailOptions);
};

module.exports = sendVerificationEmail;
