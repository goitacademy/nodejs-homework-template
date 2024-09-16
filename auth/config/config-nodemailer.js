require("dotenv").config();
const nodemailer = require("nodemailer");
const password = process.env.GMAIL_PASSWORD;

const config = {
  host: "smtp.office365.com",
  port: 587,
  secure: false,
  auth: {
    user: "zycieostrejakmaczetaelo@outlook.com",
    pass: password,
  },
};

const transporter = nodemailer.createTransport(config);

const sendVerificationEmail = (email, verificationToken) => {
  const emailOptions = {
    from: "zycieostrejakmaczetaelo@outlook.com",
    to: email,
    subject: "Nodemailer",
    html: `<p>Click <a href="http://localhost:3000/users/verify:${verificationToken}">here</a> to verify your email.</p>`,
  };

  transporter
    .sendMail(emailOptions)
    .then((info) => console.log("E-mail sent:", info))
    .catch((e) => e.message);
};
module.exports = {
  sendVerificationEmail,
};
