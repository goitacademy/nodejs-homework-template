const sendGrid = require('@sendgrid/mail')

require('dotenv-expand')(require('dotenv').config())

class SendGridProvider {
  async send({ to, from, subject, html }) {
    sendGrid.setApiKey(process.env.SENDGRID_API_KEY)

    const message = { to, from, subject, html }
    await sendGrid.send(message)
  }
}

module.exports = { SendGridProvider }