const nodemailer = require('nodemailer')
require('dotenv').config()
class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
      }
    })
  }
  
  async sendActivationMail(to, link) {
    console.log(to, link);
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: "Активация аккаунта на сайте " + process.env.API_URL,
      text: '',
      html:
        `
      <div>
        <h1>Нажмите на ссылку для активации<h1/>
        <a href="${link}">${link}</a>
      </div>
      `
    })
  }
}

module.exports = new MailService()