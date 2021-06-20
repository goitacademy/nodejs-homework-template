const sgMail = require('@sendgrid/mail');

const config = require('../config/config');

require('dotenv').config();

class CreateSenderSendgrid {
  async send(msg) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    return await sgMail.send({ ...msg, from: config.email.sendgrid });
  }
}

module.exports = {
  CreateSenderSendgrid,
};
