const Mailgen = require("mailgen");

class EmailService {
  sender: any;
  link: any;
  mailgen: any;
  constructor(sender) {
    this.sender = sender;
    this.link = "https://7358-46-98-213-78.eu.ngrok.io";
    this.mailgen = new Mailgen({
      theme: "default",
      product: {
        name: "Contacts App",
        link: this.link,
      },
    });
  }
  createEmailTemplate(username, token) {
    const email = {
      body: {
        name: username,
        intro:
          "Welcome to Contacts App! We're very excited to have you on board.",
        action: {
          instructions: "To get started with Contacts App, please click here:",
          button: {
            color: "#22BC66", // Optional action button color
            text: "Confirm your account",
            link: `${this.link}/api/users/verify/${token}`,
          },
        },
        outro:
          "Need help, or have questions? Just reply to this email, we'd love to help.",
      },
    };
    return this.mailgen.generate(email);
  }

  async sendEmail(email, token) {
    const emailTemplate = this.createEmailTemplate(email, token); // HTML code
    const message = {
      to: email,
      subject: "Welcome to Contacts App",
      html: emailTemplate,
    };
    const result = await this.sender.send(message);
    return result;
  }
}

module.exports = EmailService;
