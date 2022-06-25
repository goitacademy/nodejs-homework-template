const MGen = require('mailgen')

class SignupConfirmLetter {
  create({ host, company, name, token }) {
    const mailGenerator = new MGen({
      theme: 'default',
      product: {
        name: company,
        link: host,
      },
    })
    const template = {
      body: {
        name,
        intro: `Welcome to "${company}"! We're very excited to have you on board.`,
        action: {
          instructions: `To get started with "${company}", please click here:`,
          button: {
            color: '#22BC66',
            text: 'Confirm your account',
            link: `${host}/api/v1/users/verify/${token}`,
          },
        },
        outro:
          "Need help, or have questions? Just reply to this email, we'd love to help.",
      },
    }
    return mailGenerator.generate(template)
  }
}

module.exports = { SignupConfirmLetter }