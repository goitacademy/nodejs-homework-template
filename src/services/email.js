const { ndMailer } = require('./email/providers')
const { signupConfirmLetter } = require('./email/templates')

require('dotenv-expand')(require('dotenv').config())
const { HOST } = process.env

class EmailServices {
  constructor() {
    this.mailProvider = ndMailer
    this.templateProvider = signupConfirmLetter
  }

  async send(email, token, name) {
    try {
      const emailText = this.templateProvider.create({
        host: HOST,
        company: 'Node.js Contacts Storage',
        name,
        token,
      })

      await this.mailProvider.send({
        from: '"noreply 👻" <noreply@example.com>',
        to: email,
        subject: 'User account confirmation',
        html: emailText,
      })
    } catch (error) {
      console.error(error)
      throw error
    }
  }
}

module.exports = { EmailServices }