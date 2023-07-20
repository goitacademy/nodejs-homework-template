const nodemailer = require("nodemailer");
require("dotenv").config();

const { META_KEY } = process.env;

const nodemailerConfig = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: "v.v.derkach@meta.ua",
    pass: META_KEY,
  },
};
const transport = nodemailer.createTransport(nodemailerConfig);

const sendEmail = async (data) => {
  const email = { ...data, from: "v.v.derkach@meta.ua" };

  await transport.sendMail(email);

  return true;
};

module.exports = sendEmail;
