const nodemailer = require('nodemailer');
require('dotenv').config();

const { EMAIL_PASSWORD } = process.env;

const nodemailerConfig = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: "tomenko.sl@meta.ua",
    pass: EMAIL_PASSWORD,
  },
};

const transporter = nodemailer.createTransport(nodemailerConfig);

const sendMail = async ({ to, subject, text }) => {
  const mail = {
    from: "tomenko.sl@meta.ua",
    to,
    subject,
    text,
  };

  try {
    const result = await transporter.sendMail(mail).then(info => console.log(info));
    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = sendMail;