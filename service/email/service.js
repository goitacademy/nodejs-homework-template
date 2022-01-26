import Mailgen from "mailgen";

class EmailService {
  constructor(env, sender) {
    this.sender = sender;
    switch (env) {
      case "development":
        this.link = "http://localhost:3000/";
        break;
      case "test":
        this.link = "http://localhost:5000/";
        break;
      case "production":
        this.link = "heroku";
        break;
      default:
        this.link = "http://localhost:3000/";
    }
  }
  createEmailTemplate(username, verifyToken) {
    const mailGenerator = new Mailgen({
      theme: "default",
      product: {
        name: "GoIT 35",
        link: this.link,
      },
    });

    const email = {
      body: {
        name: username,
        intro: "Welcome",
        action: {
          instructions: "To get started, please click here:",
          button: {
            color: "#22BC66",
            text: "Confirm your account",
            link: `${this.link}/api/users/verify/${verifyToken}`,
          },
        },
        outro: "Thank you !",
      },
    };
    return mailGenerator.generate(email);
  }

  async sendVeryfyEmail(email, username, verifyToken) {
    const emailBody = this.createEmailTemplate(username, verifyToken);
    const msg = {
      to: email,
      subject: "Verify email",
      html: emailBody,
    };
    try {
      const result = await this.sender.sand(msg);
      console.log(result);
      return true;
    } catch (error) {
      console.error(error.message);
      return false;
    }
  }
}

export default EmailService;
