const sgMail = require('@sendgrid/mail')
require('dotenv').config()

const { SENGRID_KEY } = process.env

sgMail.setApiKey(SENGRID_KEY)

const email = {
  to: 'ruslan.izhovsky@gmail.com',
  from: 'pavlykb9@gmail.com',
  subject: 'Новая заявка пользователя',
  html: '<h1>Hello<h1>'
}

const sendEmail = async (data) => {
  const email = {...data,from: 'pavlykb9@gmail.com' }
  await sgMail.send(email)
}

module.exports = sendEmail(email)