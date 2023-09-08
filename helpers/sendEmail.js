// const sgMail = require("@sendgrid/mail");
const nodemailer = require("nodemailer");
require("dotenv").config();

// const { SENDGRID_API_KEY } = process.env;

// sgMail.setApiKey(SENDGRID_API_KEY);

// const sendEmail = async (data) => {
//   const email = { ...data, from: "dlta066php@gmail.com" };
//   await sgMail.send(email);
//   return true;
// };

// *** nodemailer ***

const { META_PASSWORD } = process.env;

const nodemailerConfig = {
  host: "smtp.meta.ua",
  port: 465, 
  secure: true,
  auth: {
    user: "oleksiigoit@meta.ua",
    pass: META_PASSWORD,
  },
};
const transport = nodemailer.createTransport(nodemailerConfig);

const sendEmail = async (data) => {
  const email = { ...data, from: "oleksiigoit@meta.ua" };
  transport.sendMail(email);
  return true;
};

module.exports = sendEmail;