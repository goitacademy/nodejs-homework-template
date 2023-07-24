const nodemailer = require("nodemailer");
require("dotenv").config();

const { META_PASSWORD } = process.env;
const nodemailerConfig = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: "alisaromantsova@meta.ua",
    pass: META_PASSWORD,
  },
};

const transporter = nodemailer.createTransport(nodemailerConfig);

// const email = {
//   to: "alis.romantsova@gmail.com",
//   from: "alisaromantsova@meta.ua",
//   subject: "Test email",
//   html: "<p><strong>Test email</strong>from localhost: 3000</p>",
// };

// transporter
//   .sendMail(email)
//   .then(() => console.log("Email send success"))
//   .catch((error) => console.log(error.message));

// module.exports = {
//   transporter,
// };

module.exports = transporter;
