const nodemailer = require("nodemailer");
require("dotenv").config();

const nodemailerConfig = {
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "mortimer.turner3@ethereal.email",
    pass: "NRCdSJfb8RbdSuGgbE",
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

const sendEmail = async (data) => {
  const emailOptions = { ...data, from: "mortimer.turner3@ethereal.email" };
  transport
    .sendMail(emailOptions)
    .then((info) => console.log(info))
    .catch((err) => console.log(err));
};

module.exports = sendEmail;
