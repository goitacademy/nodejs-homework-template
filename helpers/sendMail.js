const nodemailer = require("nodemailer");
require("dotenv").config();
const { UKR_PASSWORD } = process.env;

const nodemailerConfig = {
  host: "smtp.ukr.net",
  port: "465",
  secure: true,
  auth: {
    user: "lottor27@ukr.net",
    pass: UKR_PASSWORD,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

const sendEmail = async (data) => {
  try {
    const email = { ...data, from: "lottor27@ukr.net" };
    await transport.sendMail(email);
    console.log("Email sent successfully");
    return true;
  } catch (error) {
    console.error("Email sending error:", error);
    return false;
  }
};

module.exports = sendEmail;
