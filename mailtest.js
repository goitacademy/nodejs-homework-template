const nodemailer = require("nodemailer");

require("dotenv").config();

const config = {
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "i.am.blinova@gmail.com",
    pass: process.env.SMTP_PASSWORD,
  },
};

const transporter = nodemailer.createTransport(config);
const emailOptions = {
  from: "irynanodejs@gmail.com",
  to: "anubis.igor@gmail.com",
  subject: "Nodemailer test",
  text: "Привіт. Ми тестуємо надсилання листів!",
};

transporter
  .sendMail(emailOptions)
  .then((info) => console.log(info))
  .catch((err) => console.log(err));
