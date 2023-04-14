const nodemailer = require('nodemailer');
const path = require('path');
const pug = require('pug');
const { convert } = require('html-to-text');

class Email {
  constructor(user, url) {
    this.to = user.email;
    this.name = user.name;
    this.url = url;
    this.from = 'Todos Admin <ivanov1dmytro@gmail.com>';
  }

  _initTransport() {
    return nodemailer.createTransport({
      service: 'SendGrid',
      auth: {
        user: 'apikey',
        pass: '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',
      },
    });
  }

  async _send(template, subject) {
    const html = pug.renderFile(path.join(__dirname, '..', 'views', 'emails', `${template}.pug`), {
      name: this.name,
      url: this.url,
      subject,
    });

    const emailConfig = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: convert(html),
    };

    await this._initTransport().sendMail(emailConfig);
  }

  async sendHello() {
    await this._send('hello', 'Welcome to Todos App');
  }
}

module.exports = Email;
