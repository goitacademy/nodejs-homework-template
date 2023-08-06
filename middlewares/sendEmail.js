const nodemailer = require("nodemailer");
require("dotenv").config();

const { META_PASSWORD } = process.env;
console.log(META_PASSWORD);

const nodemailerConfig = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: "artemliaschenko@meta.ua",
    pass: META_PASSWORD,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

const sendEmail = async (data) => {
  const email = { ...data, from: "artemliaschenko@meta.ua" };
  await transport.sendMail(email);
  return true;
};

module.exports = sendEmail;

// const email = {
//   to: "playfootball826@gmail.com",
//   from: "artemliaschenko@meta.ua",
//   subject: "test email",
//   html: "<p>Test email</p>",
// };
