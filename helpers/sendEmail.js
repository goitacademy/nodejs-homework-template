const nodemailer = require("nodemailer");

require("dotenv").config();

const { META_PASSWORD, EMAIL_FROM } = process.env;

const nodemailerConfig = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: EMAIL_FROM,
    pass: META_PASSWORD,
  },
};

const transporter = nodemailer.createTransport(nodemailerConfig);

const sendEmail = async (data) => {
  const emailOptions = { ...data, from: EMAIL_FROM };
  await transporter.sendMail(emailOptions);
  return { massege: "The email has been sent" };
};

module.exports = sendEmail;
