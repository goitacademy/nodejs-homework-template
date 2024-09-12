const nodemailer = require("nodemailer");
const User = require("../models/user.model");
require("dotenv").config();
const config = {
  pool: true,
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  auth: {
    user: "mateusz.potocki92@gmail.com",
    pass: "KsXwvh1qMkZBrWpb",
  },
};

const send = async (email, verificationToken) => {
  const transporter = nodemailer.createTransport(config);
  const emailOptions = {
    from: "mateusz.potocki92@gmail.com",
    to: email,
    subject: "Email Verification",
    text: `Please click the link below to verify your email:<br>http://localhost:3000/api/users/verify/${verificationToken}`,
  };
  return await transporter.sendMail(emailOptions);
};

const userVerification = async (verificationToken) => {
  const response = await User.findOneAndUpdate(
    { verificationToken: verificationToken },
    { verificationToken: null, verify: true },
    { new: true }
  );
  return response;
};
module.exports = {
  send,
  userVerification,
};
