const nodemailer = require("nodemailer");

class SenderNodemailer {
  config: any;
  constructor() {
    this.config = {
      host: "smtp.meta.ua",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.USER_NODEMAILER, // generated ethereal user
        pass: process.env.PASSWORD_NODEMAILER, // generated ethereal password
      },
    };
  }

  async send(msg) {
    const transporter = nodemailer.createTransport(this.config);
    const result = await transporter.sendMail({
      ...msg,
      from: process.env.USER_NODEMAILER,
    });
    return result;
  }
}

module.exports = SenderNodemailer;
