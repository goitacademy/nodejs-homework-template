const nodemailer = require("nodemailer");
require("dotenv").config();

const { META_PASSWORD } = process.env;

const nodemailerConfig = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: "havuraa@meta.ua",
    pass: META_PASSWORD,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

const sendEmail = async (email) => {
  const emailToSend = {
    ...email,
    from: "havuraa@meta.ua",
  };
  await transport.sendMail(emailToSend);
  return true;
};

module.exports = { sendEmail };
