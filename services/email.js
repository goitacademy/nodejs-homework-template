const Mailgen = require('mailgen');
const sgMail = require('@sendgrid/mail');
const { dev, stage, prod } = require('../config/email.json');
console.log('DEV>>>>>>>>>', dev);

require('dotenv').config();

class EmailService {
  #sender = sgMail;
  #GenerateTemplate = Mailgen;
  constructor(env) {
    switch (env) {
      case 'development':
        this.link = dev;
        break;
      case 'stage':
        this.link = stage;
        break;
      case 'production':
        this.link = prod;
        break;

      default:
        this.link = dev;
        break;
    }
  }
  #createTemplate(verifyToken, name = 'Guest') {
    const mailGenerator = new this.#GenerateTemplate({
      theme: 'cerberus',
      product: {
        name: 'System Contacts',
        link: this.link,
        logo: 'logo.svg',
      },
    });
    const template = {
      body: {
        name,
        intro: 'Привет, ты успешно прошел ругистрацию',
        action: {
          instructions: 'Чтобы закончить регистрацию кликните на кнопку',
          button: {
            color: '#22BC66', // Optional action button color
            text: 'Подтвердить акаунт',
            link: `${this.link}/api/users/verify/${verifyToken}`,
          },
        },
        outro:
          "Need help, or have questions? Just reply to this email, we'd love to help.",
      },
    };

    return mailGenerator.generate(template);
  }
  async sendEmail(verifyToken, email, name) {
    const emailBody = this.#createTemplate(verifyToken, name);
    this.#sender.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: email,
      from: 'transformator98@meta.ua',
      subject: 'Подтверждение регистрации',
      html: emailBody,
    };
    await this.#sender.send(msg);
  }
}

module.exports = EmailService;
