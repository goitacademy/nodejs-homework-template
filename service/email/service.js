const Mailgen = require('mailgen');

class EmailService {
  constructor(env, sender) {
    this.sender = sender;

    switch (env) {
      case 'development':
        this.link = 'http://localhost:3000';
        break;

      case 'production':
        this.link = 'link for production';
        break;

      default:
        break;
    }
  }

  createTemplateEmail(verifyToken) {
    const mailGenerator = new Mailgen({
      theme: 'neopolitan',
      product: {
        name: 'Contact book',
        link: this.link,
      },
    });

    const email = {
      body: {
        intro:
          "Welcome to Contact book! We're very excited to have you on board.",
        action: {
          instructions: 'To get started with Contact book, please click here:',
          button: {
            color: '#22BC66',
            text: 'Confirm your account',
            link: `${this.link}/api/users/verify/${verifyToken}`,
          },
        },
      },
    };

    return mailGenerator.generate(email);
  }

  async sendVerifyEmail(email, verifyToken) {
    const emailHTML = this.createTemplateEmail(verifyToken);

    const msg = {
      to: email,
      subject: 'Verify your email',
      html: emailHTML,
    };

    try {
      const result = await this.sender.send(msg);
      console.log(result);
      return true;
    } catch (error) {
      console.log('error', error.message);
      return false;
    }
  }
}

module.exports = EmailService;
