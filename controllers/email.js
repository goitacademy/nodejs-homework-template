const nodemailer = require("nodemailer");
require("dotenv").config();

const { M_USER, M_PASS, M_PORT, M_HOST, M_FROM } = process.env;

const transporter = nodemailer.createTransport({
  host: M_HOST,
  port: M_PORT,
  secure: false,
  auth: {
    user: M_USER,
    pass: M_PASS,
  },
});

const main = async (email, subject, html) => {
  const info = await transporter.sendMail({
    from: M_FROM,
    to: email,
    subject,
    html, 
  });
  console.log("Message sent: %s", info.messageId);
};
module.exports = { main };