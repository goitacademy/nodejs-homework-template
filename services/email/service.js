const Mailgen = require("mailgen");

class EmailService {
  constructor(env, sender) {
    this.sender = sender; //sendgrid or nodemailer
    switch (env) {
      case "development":
        this.link = "https://d8a3-91-214-85-111.ngrok.io";
        break;
      case "production":
        this.link = "link for production";
        break;
      default:
        this.link = "http://127.0.0.1:3030";
        break;
    }
  }
  createTemplateEmail(name, verifyToken) {
    const mailGenerator = new Mailgen({
      theme: "default",
      product: {
        name: "Mailgen",
        link: this.link,
      },
    });

    const email = {
      body: {
        name,
        intro:
          "Welcome to Test mail app! We're very excited to have you on board.",
        action: {
          instructions: "To get started with Test mail app, please click here:",
          button: {
            color: "#22BC66", // Optional action button color
            text: "Confirm your account",
            link: `${this.link}/api/users/verify/${verifyToken}`,
          },
        },
      },
    };
    return mailGenerator.generate(email);
  }

  async sendVerifyEmail(email, name, verifyToken) {
    const emailHTML = this.createTemplateEmail(name, verifyToken);
    console.log(email);
    const msg = { to: email, subject: "Verify your email", html: emailHTML };
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
