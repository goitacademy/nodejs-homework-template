const nodemailer = require("nodemailer");
require("dotenv").config();

const { META_PASSWORD } = process.env;

const nodemailerConfig = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: "annapol09@meta.ua",
    pass: META_PASSWORD,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

// const email = {
//   to: "annapol1989@gmail.com",
//   from: "annapol09@meta.ua",
//   subject: "Test email",
//   html: "<p><strong>Dear Anna,</strong> hello from meta.ua</p>",
// };

const sendEmail = async (data) => {
  const email = { ...data, from: "annapol09@meta.ua" };
  await transport.sendMail(email);
  return true;
};

module.exports = sendEmail;
