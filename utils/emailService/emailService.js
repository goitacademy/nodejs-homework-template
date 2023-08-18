const nodemailer = require("nodemailer");

class Email {
  constructor(user, token) {
    this.emailOptions = {
      from: "tonyako23@meta.ua",
      to: user.email,
      subject: "Nodemailer test",
      text: `Please click on this link /users/verify/${token} to verify your email`,
    };
  }

  _initTransport() {
    console.log("process.env.PASSWORD", process.env.PASSWORD);
    return nodemailer.createTransport({
      host: "smtp.meta.ua",
      port: 465,
      secure: true,
      auth: {
        user: "tonyako23@meta.ua",
        pass: "5aanHhv#",
      },
    });
  }

  async sendVerificationToken() {
    try {
      await this._initTransport().sendMail(this.emailOptions);
    } catch (err) {
      console.log("error send email", err);
    }
  }
}

module.exports = Email;
