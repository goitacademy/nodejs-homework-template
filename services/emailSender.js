const sgMail = require("@sendgrid/mail");
const nodemailer = require("nodemailer");
require("dotenv").config();

class CreateSenderSendGrid {
  async send(msg) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    return await sgMail.send({ ...msg, from: "maks20355@gmail.com" });
  }
}

class CreateSenderNodemailer {
  async send(msg) {
    const config = {
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL, // generated ethereal user
        pass: process.env.PASSWORD, // generated ethereal password
      },
    };
    const transporter = nodemailer.createTransport(config);
    console.log(transporter);
    return await transporter.sendMail({ ...msg, from: process.env.EMAIL });
  }
}

module.exports = { CreateSenderSendGrid, CreateSenderNodemailer };
