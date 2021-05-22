const sendgrid = require("@sendgrid/mail");
const Mailgen = require("mailgen");
require("dotenv").config();

class EmailService {
  #sender = sendgrid;
  #GenerateTemplate = Mailgen;
  constructor(env) {
    switch (env) {
      case "development":
        this.link = "http://localhost:3000";
        break;

      case "production":
        this.link = "link for production";
        break;

      default:
        this.link = "http://localhost:3000";
        break;
    }
  }

  createTemplateVerifyEmail(verifyToken, name) {
    //верстка для письма
    const mailGenerator = new this.#GenerateTemplate({
      theme: "cerberus",
      product: {
        // Appears in header & footer of e-mails
        name: "System contacts",
        link: this.link,
        // Optional product logo
        // logo: 'https://mailgen.js/img/logo.png'
      },
    });

    const email = {
      body: {
        name,
        intro:
          "Welcome to System contacts! We're very excited to have you on board.",
        action: {
          instructions:
            "To get started with System contacts, please click here:",
          button: {
            color: "#22BC66", // Optional action button color
            text: "Confirm your account",
            link: `${this.link}/api/users/verify/${verifyToken}`,
          },
        },
      },
    };

    // Generate an HTML email with the provided contents
    const emailBody = mailGenerator.generate(email);
    return emailBody;
  }

  async sendVerifyEmail(verifyToken, email, name) {
    this.#sender.setApiKey(process.env.SENDGRID_API_KEY);

    const msg = {
      to: email, // Change to your recipient
      from: "biggermir@gmail.com", // Change to your verified sender
      subject: "Verify email",
      html: this.createTemplateVerifyEmail(verifyToken, name),
    };

    this.#sender.send(msg);
    //   .then((response) => {
    //     console.log(response[0].statusCode);
    //     console.log(response[0].headers);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
  }
}

module.exports = EmailService;
