const nodemailer = require("nodemailer");
require("dotenv").config();

const { META_PASS } = process.env;

const nodemailerConfig = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: "excusemewhat@meta.ua",
    pass: META_PASS,
  },
};

const transporter = nodemailer.createTransport(nodemailerConfig);

const sendMail = (mail) => {
  mail = { from: "excusemewhat@meta.ua", ...mail };
  transporter.sendMail(mail).catch((error) => {
    throw error;
  });
};

module.exports = sendMail;
