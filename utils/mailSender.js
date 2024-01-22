const nodemailer = require("nodemailer");
const serverConfig = require("../config/serverConfig");

require("dotenv").config();
const pass = serverConfig.EMAIL_PASSWORD;
const config = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: "ykcyc13@meta.ua",
    pass,
  },
};

const transporter = nodemailer.createTransport(config);
const mailSender = async (data) => {
  const emailOptions = {
    ...data,
    from: "ykcyc13@meta.ua",
    to: "ykcyc13@meta.ua",
  };
  console.log(emailOptions);

  try {
    await transporter.sendMail(emailOptions);
    console.log("Verification email sent");
    return true;
  } catch (err) {
    console.error(err.message);
    return false;
  }
};

module.exports = mailSender;
