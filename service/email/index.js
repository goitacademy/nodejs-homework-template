const EmailService = require('./emailService');
const { SenderSendgrid, SenderNodemailer } = require('./emailSenderService');

module.exports = {
  SenderSendgrid,
  SenderNodemailer,
  EmailService,
};
