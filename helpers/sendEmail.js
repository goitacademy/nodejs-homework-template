const nodemailer = require("nodemailer");
require("dotenv").config();

const { GMAIL_PASSWORD, GMAIL_EMAIL } = process.env;

const sendEmail = (emailOptions) => {
  const config = {
    host: "smtp.meta.ua",
    port: 465,
    secure: true,
    auth: {
      user: GMAIL_EMAIL,
      pass: GMAIL_PASSWORD,
    },
  };
  const transporter = nodemailer.createTransport(config);

  transporter
    .sendMail({
      from: GMAIL_EMAIL,
      ...emailOptions,
    })
    .then((info) => {
      console.log("Email відправлено успішно", info);
    })
    .catch((error) => {
      console.error("Помилка відправлення імейла", error);
    });
};

module.exports = {
  sendEmail,
};
