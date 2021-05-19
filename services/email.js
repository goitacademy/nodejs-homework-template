const sendgrid = require('@sendgrid/mail');
const Mailgen = require('mailgen');
require('dotenv').config();
class EmailService {
  #sender = sendgrid;
  #GenerateTamplate = Mailgen;
  constructor(env) {
    switch (env) {
      case 'development':
        this.link = 'http://localhost:3000';
        break;
      case 'production':
        this.link = 'link for production';
        break;
      default:
        this.link = 'http://localhost:3000';
        break;
    }
  }
  #createTemplateVerifyEmail(verifyToken, email) {
    const mailGenerator = new this.#GenerateTamplate({
      theme: 'cerberus',
      product: {
        name: 'System contacts',
        link: this.link,
      },
    });
    const emailTamplate = {
      body: {
        name: email,
        intro: 'Welcome to System contacts!',
        action: {
          instructions:
            'To get started with System contacts, please click here:',
          button: {
            color: '#22BC66',
            text: 'Confirm your account',
            link: `${this.link}/api/users/verify/${verifyToken}`,
          },
        },
      },
    };
    const emailBody = mailGenerator.generate(emailTamplate);
    return emailBody;
  }
  async sendVerifyUser(verifyToken, email) {
    this.#sender.setApiKey(process.env.SENDGRID_API_KEY);

    const msg = {
      to: email,
      from: 'perry.dev7@gmail.com',
      subject: 'Verify Email',
      html: this.#createTemplateVerifyEmail(verifyToken, email),
    };

    this.#sender.send(msg);
  }
}
module.exports = EmailService;
