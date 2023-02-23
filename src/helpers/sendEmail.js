const nodemailer = require("nodemailer");
require("dotenv").config();
const { MAIL_PASSWORD } = process.env;

const nodemailConfig = {
  host: "smtp.meta.ua",
  port: "465", // 2525
  secure: true,
  auth: {
    user: "phonebok@meta.ua",
    pass: MAIL_PASSWORD,
  },
};

const transporter = nodemailer.createTransport(nodemailConfig);

const sendEmail = async (data) => {
  const email = { ...data, from: "phonebok@meta.ua" };
  try {
    await transporter.sendMail(email);
    return true;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { sendEmail };
