const sgMail = require('@sendgrid/mail')
require('dotenv').config()

const { API_KEY_SEND_GRID } = process.env

sgMail.setApiKey(API_KEY_SEND_GRID)

const sendEmail = async (data) => {
  const email = { ...data, from: 'steelhand@ukr.net' }
  try {
    await sgMail.send(email)
    console.log('Send mail success')
    return true
  } catch (error) {
    throw error
  }
}

module.exports = sendEmail
