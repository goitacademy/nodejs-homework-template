// рассылает сообщения с помощью сервиса SendGrid

const sgMail = require('@sendgrid/mail');

require('dotenv').config();

const { SENDGRID_API_KEY, SENDER } = process.env;
sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmailWithSendGrid = async data => {
  const mail = { ...data, from: SENDER };
  await sgMail.send(mail);
  return true;
};

module.exports = sendEmailWithSendGrid;
