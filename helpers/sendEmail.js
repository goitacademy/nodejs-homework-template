const nodemailer = require("nodemailer");
require("dotenv").config();

const { META_PASSWORD } = process.env;

const nodemailerConfig = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: "koleynik82@meta.ua",
    pass: META_PASSWORD,
  },
};

const transporter = nodemailer.createTransport(nodemailerConfig);

const sendEmail = async (data) => {
    const email = { ...data, from: "koleynik82@meta.ua" };
    try {
        await transporter.sendMail(email);
        return true;
    } catch (error) {
        throw error.message;
    }
  }

// const email = {
//   to: "lazyuno1987@gmail.com",
//   from: "koleynik82@meta.ua",
//   subject: "Перевірка працювання пошти",
//   html: "<p>Новая заявка на підтвердження</p>",
// };

// transporter
//   .sendMail(email)
//   .then(() => console.log("Email send success"))
//   .catch((error) => console.log(error.message));

module.exports = sendEmail;