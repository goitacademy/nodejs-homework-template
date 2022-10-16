const nodemailer = require("nodemailer");
require("dotenv").config();

const { META_PASS } = process.env;

const nodemailerConfig = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: "excusemewhat@meta.ua",
    pass: META_PASS,
  },
};

const transporter = nodemailer.createTransport(nodemailerConfig);

const sendVerifyMail = (email, verificationToken) => {
  const mail = {
    to: email,
    from: "excusemewhat@meta.ua",
    subject: "Email confirmation",
    html: `<a target="_blank" href='http://localhost:3000/users/verify/${verificationToken}'>Confirm email</a>`,
  };

  transporter.sendMail(mail).catch((error) => {
    throw error;
  });
};

module.exports = sendVerifyMail;
