const sendGridMail = require('@sendgrid/mail')
require('dotenv').config()

class CreateSenderSendgrid {
  async send(msg) {
    sendGridMail.setApiKey(process.env.SENDGRID_API_KEY)

    return await sendGridMail.send({ ...msg, from: 'litwinenkooleg371@gmail.com@gmail.com' })
  }
}

module.exports = CreateSenderSendgrid
