const Mailgen = require('mailgen');
class EmailService {
  constructor(env, sender) {
    this.sender = sender;
    switch (env) {
      case 'development':
        this.link = 'http://localhost:3000/';
        break;
      case 'test':
        this.link = 'http://localhost:5000/';
        break;
      case 'production':
        this.link = 'http://heroku/';
        break;
      default:
        this.link = 'http://localhost:3000/';
    }
  }

  createEmailTemplate(username, verifyToken) {
    const mailGenerator = new Mailgen({
      theme: 'default',
      product: {
        // Appears in header & footer of e-mails
        name: 'Kretsul_Vitalii',
        link: this.link,
      },
    });
    const email = {
      body: {
        name: username,
        intro: "Welcome! We're very excited to have you on board.",
        action: {
          instructions: 'To get started with Mailgen, please click here:',
          button: {
            color: '#22BC66', // Optional action button color
            text: 'Confirm your account',
            link: `${this.link}api/v1/users/verify/${verifyToken}`,
          },
        },
        outro: 'Якщо Вам потрібна допомога, чекаємо на Вашу відповідь. Дякуєм.',
      },
    };
    return mailGenerator.generate(email);
  }

  async sendVerifyEmail(email, username, verifyToken) {
    const emailBody = this.createEmailTemplate(username, verifyToken);
    const msg = {
      to: email, // Change to your recipient
      from: '*****@gmail.com', // Change to your verified sender
      subject: 'Confirm your email',
      // text: 'and easy to do anywhere, even with Kretsul Vitaliy',
      html: emailBody,
    };
    try {
      await this.sender.send(msg);
      return true;
    } catch (error) {
      console.error(error.message);
      return false;
    }
  }
}
module.exports = EmailService;
