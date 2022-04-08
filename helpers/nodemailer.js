const nodemailer = require("nodemailer");

require("dotenv").config();

const { META_PASS } = process.env;

const config = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: "shopoff98@meta.ua",
    pass: META_PASS,
  },
};

const transporter = nodemailer.createTransport(config);

module.exports = transporter;
