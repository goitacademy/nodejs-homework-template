const nodemailer = require("nodemailer");

require("dotenv").config();

const config = {
  host: "smtp.ukr.net",
  port: 465,
  secure: true,
  auth: {
    user: "maksmrk@ukr.net",
    pass: process.env.PASSWORD,
  },
};

const sendEmail = async (data) => {
  try {
    const transporter = nodemailer.createTransport(config);
    await transporter.sendMail(data).then((info) => console.log(info));
    return true;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = sendEmail;
