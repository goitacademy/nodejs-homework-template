const sendgrid = require('@sendgrid/mail')
const Mailgen = require('mailgen')
require('dotenv').config()

class EmailService {
  #sender = sendgrid
  #GenerateTemplate = Mailgen
  constructor (env) {
    switch (env) {
      case 'development':
        this.link = 'http://localhost:3000'
        break
      case 'production':
        this.link = 'link for production'
        break
      default:
        this.link = 'http://localhost:3000'
        break
    }
  }
  #createTemplateVerifyEmail (verifyToken, name) {
    const mailGenerator = new this.#GenerateTemplate({
      theme: 'default',
      product: {
        name: 'nodejs-contacts-rest-api',
        link: this.link
      }
    })
    const email = {
      body: {
        name,
        intro: 'Welcome to nodejs-contacts-rest-api!',
        action: {
          instructions: 'To get started please click here:',
          button: {
            color: '#22BC66',
            text: 'Confirm your account',
            link: `${this.link}/api/users/verify/${verifyToken}`
          }
        }
      }
    }
    const emailBody = mailGenerator.generate(email)
    return emailBody
  }
  async sendVerifyEmail (verifyToken, email, name) {
    this.#sender.setApiKey(process.env.SENDGRID_API_KEY)
    const msg = {
      to: email,
      from: 'noreply@system-pb.com',
      subject: 'Verify email',
      html: this.#createTemplateVerifyEmail(verifyToken, name)
    }
    this.#sender.send(msg)
  }
}

module.exports = EmailService
