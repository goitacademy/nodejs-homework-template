const Mailgen = require("mailgen");
require("dotenv").config();

class EmailService {
  constructor(env, sender) {
    this.sender = sender;
    switch (env) {
      case "development":
        this.link = process.env.DEV_LINK;
        break;
      case "production":
        this.link = 'link for production';
        break;
      default:
        this.link = process.env.DEV_LINK;
        break;
    }
  }

  createTemplateEmail(name, verifyToken) {
    const mailGenerator = new Mailgen({
      theme: "salted",
      product: {
        name: "Contact Collection",
        link: this.link,
      },
    });

    const email = {
      body: {
        name,
        intro:
          "Welcome to Contact Collection! We're very excited to have you on board.",
        action: {
          instructions:
            "To get started with Contact Collection, please click here:",
          button: {
            color: "#22BC66",
            text: "Please confirm your account!",
            link: `${this.link}/api/users/verify/${verifyToken}`,
          },
        },
      },
    };
    return mailGenerator.generate(email);
  }

  async sendVerifyEmail(email, name, verifyToken) {
    const emailHTML = this.createTemplateEmail(name, verifyToken);
    const msg = {
      to: email,
      subject: "Verification email",
      html: emailHTML,
    };
    try {
      const result = await this.sender.send(msg);
      console.log(result);
      return true;
    } catch (error) {
      console.log(error.message);
      return false;
    }
  }
}

module.exports = EmailService;   