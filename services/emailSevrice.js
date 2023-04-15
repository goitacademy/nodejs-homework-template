const nodemailer = require("nodemailer");
const path = require("path");
const pug = require("pug");
const { convert } = require("html-to-text");
const dotenv = require("dotenv");

dotenv.config({ path: "./.env" });

const {
  NODE_ENV,
  EMAIL_USER,
  EMAIL_PASSWORD,
  SENDGRID_FROM,
  SENDGRID_USERNAME,
  SENDGRID_APIKEY,
} = process.env;

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.name = user.email;
    this.url = url;
    this.from = `Portal admin <${SENDGRID_FROM}>`;
  }

  _initTransport() {
    if (NODE_ENV === "development") {
      return nodemailer.createTransport({
        service: "SendGrid",
        auth: {
          user: SENDGRID_USERNAME,
          pass: SENDGRID_APIKEY,
        },
      });
    }

    return nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASSWORD,
      },
    });
  }

  async _send(template, subject) {
    const html = pug.renderFile(
      path.join(__dirname, "..", "view", "emails", `${template}.pug`),
      {
        name: this.email,
        url: this.url,
        subject,
      }
    );

    const emailConfig = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: convert(html),
    };

    await this._initTransport().sendMail(emailConfig);
  }

  async sendVerifyEmail2() {
    await this._send("verifyLetter", "This letter is verify");
  }
};