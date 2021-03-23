const Mailgen = require("mailgen");
const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const config = require("../config/email.json");

class EmailService {
  #sender = sgMail;
  #GenerateTemplate = Mailgen;
  constructor(env) {
    switch (env) {
      case "development":
        this.link = config.dev;
        break;
      case "stage":
        this.link = config.stage;
        break;
      case "production":
        this.link = config.prod;
        break;
      default:
        this.link = config.dev;
        break;
    }
  }
  #createTemplate(verifyToken, name = "Guest") {
    const mailGenerator = new this.#GenerateTemplate({
      theme: "neopolitan",
      product: {
        name: "Contacts",
        link: this.link,
      },
    });
    const template = {
      body: {
        name,
        intro: "Welcome to verify form",
        action: {
          instructions: "Click on the button for ending registration",
          button: {
            color: "#22BC66", // Optional action button color
            text: "Confirm your account",
            link: `${this.link}/api/users/verify/${verifyToken}`,
          },
        },
        outro:
          "Need help, or have questions? Just reply to this email, we'd love to help.",
      },
    };
    return mailGenerator.generate(template);
  }
  sendEmail(verifyToken, name, email) {
    const emailBody = this.#createTemplate(verifyToken, name);
      this.#sender.setApiKey(process.env.SENDGRID_API_KEY);
       const msg = {
      to: email,
      from: "no-reply1@mail.com",
      subject: "Confirmation of registration",
      html: emailBody,
    };
    await this.#sender.send(msg);
  }
}

module.exports = EmailService;
