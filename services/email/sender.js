const nodemailer = require("nodemailer");
require("dotenv").config();

class CreateSenderNodemailer {
  async send(msg) {
    const config = {
      host: "smtp.meta.ua",
      port: 465,
      secure: true,
      auth: {
        user: "mostotest@meta.ua",
        pass: process.env.PASSWORD_NEW,
      },
    };
    // process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    // const transporter = nodemailer.createTransport(config);
    const transporter = nodemailer.createTransport(config);
    return await transporter.sendMail({ ...msg, from: "mostotest@meta.ua" });
  }
}

module.exports = { CreateSenderNodemailer };
