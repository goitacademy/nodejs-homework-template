const nodemailer = require("nodemailer");
require("dotenv").config();

const { META_PASSWORD } = process.env;
const nodemailerconfig = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: "romankhorol@meta.ua",
    pass: META_PASSWORD,
  },
};

const transport = nodemailer.createTransport(nodemailerconfig);
const sendEmail = async (data) => {
  const email = { ...data, from: "romankhorol@meta.ua" };
  await transport
    .sendMail(email)
    .then(() => console.log("Email send succes"))
    .catch((error) => console.log(error.message));
};
module.exports = sendEmail;
