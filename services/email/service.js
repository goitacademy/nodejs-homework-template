const Mailgen = require('mailgen');

class EmailService {
  constructor(sender) {
    this.sender = sender;
    this.link = 'http://localhost:3000';
    this.mailgen = new Mailgen({
      theme: 'default',
      product: {
        name: 'My App',
        link: this.link,
      },
    });
  }
  createEmailTemplate(username, token) {
      const email = {
      body: {
        name: username,
        intro: 'Welcome to My App! We are very excited to have you on board.',
        action: {
          instructions: 'To get started with Mailgen, please click here:',
          button: {
            color: '#22BC66', 
            text: 'Confirm your account',
            link: `${this.link}/api/auth/verify-email/${token}`,
          },
        },
        outro:
          'Need help, or have questions? Just reply to this email, we would love to help.',
      },
    };
    return this.mailgen.generate(email);
  }

  async sendEmail(email, username, token) {
    const emailTemplate = this.createEmailTemplate(username, token);
    const message = {
      to: email,
      subject: 'Welcome to My App',
      html: emailTemplate,
    };
    const result = await this.sender.send(message);
    return result
  
  }
}

module.exports = EmailService
