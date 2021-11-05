const nodemailer = require("nodemailer");
require("dotenv").config();

class CreateSenderNodemailer {
  async send(msg) {
    const config = {
      host: "smtp.meta.ua",
      port: 465,
      secure: true,
      auth: {
        user: "test-nodejs@meta.ua",
        pass: process.env.PASSWORD,
      },
    };
    const transporter = nodemailer.createTransport(config);
    return await transporter.sendMail({ ...msg, from: "test-nodejs@meta.ua" });
  }
}

module.exports = { CreateSenderNodemailer };
