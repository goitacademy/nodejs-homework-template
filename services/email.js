const nodemailer = require("nodemailer");
require("dotenv").config();

const emailTransport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "3ad885ec0744e4",
    pass: "7282bdaac3b0f7",
  },
});

const sendEmail = async (data) => {
  const email = { ...data, from: process.env.MAIL_USER };
  try {
    await emailTransport.sendMail(email);
    console.log("Email has sent successfully");
    return true;
  } catch (error) {
    console.log(error.message);
    return false;
  }
};

module.exports = sendEmail;
