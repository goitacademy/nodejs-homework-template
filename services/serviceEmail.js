const sgMail = require('@sendgrid/mail')
const Mailgen = require('mailgen')
require('dotenv').config()

const createTemplate = (verifyToken, email) => {
  const mailGenerator = new Mailgen({
    theme: 'default',
    product: {
      name: 'System Contacts',
      link: 'http://localhost:8081/',
    },
  })

  const template = {
    body: {
      name: email,
      intro: 'Welcome on board.',
      action: {
        instructions: 'To get started, please click the button below:',
        button: {
          color: '#22BC66',
          text: 'Confirm your account',
          link: `http://localhost:8081/api/users/verify/${verifyToken}`,
        },
      },
      outro: 'For help reply to this email.',
    },
  }

  const emailCore = mailGenerator.generate(template)
  return emailCore
}

const sendEmail = async (verifyToken, email) => {
  const emailCore = createTemplate(verifyToken, email)
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)
  const msg = {
    to: email,
    from: 'iren0988@gmail.com',
    subject: 'Thank you for the registration',
    text: 'And easy to do anywhere, even with Node.js',
    html: emailCore,
  }
  await sgMail.send(msg)
}

module.exports = {
  sendEmail,
}
