const Mailgen = require("mailgen");

class EmailService {
  constructor(env, sender) {
    this.sender = sender; //sendgrid or nodemailer
    switch (env) {
      case "development":
        this.link = "http://localhost:3030";
        break;
      case "production":
        this.link = "link for production";
        break;
      default:
        break;
    }
  }
  createTemplateEmail(name, verifyToken) {
    const mailGenerator = new Mailgen({
      theme: "neopolitan",
      product: {
        name: "Test mail app",
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

  async senVerifyEmail(email, name, verifyToken) {
    const emailHTML = this.createTemplateEmail(name, verifyToken);
    const msg = { to: email, subject: "Verify your email", email: emailHTML };
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
