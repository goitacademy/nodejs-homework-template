const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false, 
  },
});

const sendEmail = ({ to, subject, text }) => {
  const mailOptions = {
    from: "jarevych@meta.ua",
    to,
    subject,
    text,
  };
  return transport.sendMail(mailOptions);
};

const sendVerificationEmail = async (to, verificationToken) => {
  const url = `http://localhost:3000/api/users/verify/${verificationToken}`;
  const verify = {
    to,
    subject: "Verification email",
    text: `Hello, this is a verification email! Confirm your email using this ${url}`,
  };
  await sendEmail(verify);
};

module.exports = { sendEmail, sendVerificationEmail };
