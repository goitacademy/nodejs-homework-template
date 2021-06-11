const sgMail = require("@sendgrid/mail");
const nodemailer = require("nodemailer");
const config = require("../config/config");

require("dotenv").config();

class CreateSenderSendgrid {
  async send(msg) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    return await sgMail.send({ ...msg, from: config.email.sendgrid });
  }
}

class CreateSenderNodemailer {
  async send(msg) {
    const options = {
      host: "smtp.meta.ua",
      port: 465,
      secure: true,
      auth: {
        user: config.email.nodemailer,
        pass: process.env.PASSWORD_META_UA,
      },
    };

    const transporter = nodemailer.createTransport(options);
    const emailOptions = {
      from: config.email.nodemailer,
      ...msg,
    };

    return await transporter.sendMail(emailOptions);
  }
}

module.exports = { CreateSenderSendgrid, CreateSenderNodemailer };
