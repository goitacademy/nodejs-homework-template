const Mailgen = require('mailgen')

class EmailService {
  constructor(env, sender) {
    this.sender = sender
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
  #createTemplateVerifyEmail(token, name) {
    const mailGenerator = new Mailgen({
      theme: 'neopolitan',
      product: {
        name: 'GoItHomework',
        link: this.link
      }
    });
    const email = {
      body: {
        name,
        intro: 'Welcome to Mailgen! We\'re vert excited to have you on board.',
        action: {
          instructions: 'To get started with Sistem users, please click here:',
          button: {
          color: '#22BC66',
          text: 'Confirm your account',
          link: `${this.link}/api/users/verify/${token}`,
        },
      },
    },
    }
    return emailBody = mailGenerator.generate(email)
}

  async sendVerifyPassworldEmail(token, email, name) {
    const emailBody = this.#createTemplateVerifyEmail(token, name)
    const result = await this.sender.send({
      to: email,
      subject: 'Verify your account',
      html: emailBody,
    })
    console.log(result)
  }
}


module.exports = EmailService