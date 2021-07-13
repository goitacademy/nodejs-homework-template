const nodemailer = require('nodemailer')
const Mailgen = require('mailgen')
require('dotenv').config()

const config = {
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
}

const transporter = nodemailer.createTransport(config)

const createTemplate = (verifyToken, email) => {
  const mailGenerator = new Mailgen({
    theme: 'default',
    product: {
      name: 'System Contacts',
      link: 'http://localhost:3000/',
    },
  })
  const template = {
    body: {
      name: email,
      intro:
        "Welcome to System Contacts! We're very excited to have you on board.",
      action: {
        instructions: 'To get started with System Contacts, please click here:',
        button: {
          color: '#22BC66',
          text: 'Confirm your account',
          link: `http://localhost:3000/api/users/verify/${verifyToken}`,
        },
      },
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  }
  const emailBody = mailGenerator.generate(template)
  return emailBody
}

const sendEmail = async (verifyToken, email) => {
  const emailBody = createTemplate(verifyToken, email)
  const msg = {
    to: email,
    from: 'noreply@system-contacts.com',
    subject: 'Sending with SendGrid is Fun',
    html: emailBody,
  }

  await transporter.sendMail(msg)
}

module.exports = {
  sendEmail,
}
