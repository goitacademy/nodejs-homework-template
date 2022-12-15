const nodemailer = require("nodemailer");
require("dotenv").config();

const config = {
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.NODEMAILER_SENDER,
    pass: process.env.NODEMAILER_API_KEY,
  },
};

const sendMailService = async (subject, text, email) => {
  const transporter = nodemailer.createTransport(config);
  const emailOptions = {
    from: process.env.NODEMAILER_SENDER,
    to: email,
    subject,
    text,
  };
  try {
    return await transporter.sendMail(emailOptions);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = sendMailService;
