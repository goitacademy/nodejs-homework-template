const nodemailer = require("nodemailer");
require("dotenv").config();

const { META_PASSWORD } = process.env;

const transporter = nodemailer.createTransport({
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: "dubyniuk.yuliia@meta.ua",
    pass: META_PASSWORD,
  },
});

const sendEmail = async (data) => {
    const email = { ...data, from: "dubyniuk.yuliia@meta.ua" };
    await transporter
      .sendMail(email)
      .then(() => console.log("Email was send successfully"))
      .catch((error) => console.log(error.message));
    return true;
}
sendEmail();

module.exports = sendEmail;
