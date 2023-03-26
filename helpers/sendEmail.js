const nodemailer = require("nodemailer");
require("dotenv").config();

const { META_PASSWORD } = process.env;

const nodemailerConfig = {
  host: "smtp.ukr.net",
  port: 465,
  secure: true,
  auth: {
    user: "ishen3@ukr.net",
    pass: META_PASSWORD,
  },
};

const transporter = nodemailer.createTransport(nodemailerConfig);

const sendEmail = async (data) => {
    const email = { ...data, from: "ishen3@ukr.net" };
    try {
        await transporter.sendMail(email);
        return true;
    } catch (error) {
        throw error.message;
    }
  }

// const email = {
//   to: "ishen3@ukr.net",
//   from: "ishen3@ukr.net",
//   subject: "Перевірка працювання пошти",
//   html: "<p>Новая заявка на підтвердження</p>",
// };

// transporter
//   .sendMail(email)
//   .then(() => console.log("Email send success"))
//   .catch((error) => console.log(error.message));

module.exports = sendEmail;