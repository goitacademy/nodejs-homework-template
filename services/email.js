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
      case "production":
        this.link = config.prod;
        break;
      case "stage":
        this.link = config.stage;
        break;

      default:
        this.link = config.dev;
        break;
    }
  }
  #createTemplate(verifyToken, name = "Guest") {
    const mailGenerator = new this.#GenerateTemplate({
      theme: "cerberus",
      product: {
        // Appears in header & footer of e-mails
        name: "Contacts Book",
        link: this.link,
      },
    });
    const template = {
      body: {
        name,
        intro:
          "Welcome to your personal Contacts Book! We are happy to provide you with our service!",
        action: {
          instructions:
            "To get started with Contacts Book, please verify your e-mail address by clicking here:",
          button: {
            color: "#22BC66", // Optional action button color
            text: "Verify my email",
            link: `${this.link}auth/verify/${verifyToken}`,
          },
        },
        outro: "This is an auto-generated email. Please do not reply",
      },
    };
    return mailGenerator.generate(template);
  }
  async sendEmail(verifyToken, email, name) {
    const emailBody = this.#createTemplate(verifyToken, name);
    this.#sender.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: email,
      from: "msparkwebdev@gmail.com", // Use the email address or domain you verified above
      subject: "Complete your registration at Contacts Book",
      html: emailBody,
    };
    //ES6
    await this.#sender.send(msg);
  }
}

module.exports = EmailService;
