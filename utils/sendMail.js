const nodemailer = require('nodemailer')
require('dotenv').config()
const { InternalServerError } = require('http-errors')

const { EMAIL_PASSWORD, EMAIL_USER, } = process.env

const nodemailerConfig = {
  host: 'smtp.meta.ua',
  port: 465,
  secure: true,
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASSWORD,
  },
}

const transporter = nodemailer.createTransport(nodemailerConfig)

const sendMail = async (data) => {
  try {
    const email = { ...data, from: EMAIL_USER }
    await transporter.sendMail(email)
  } catch (error) {
    throw new InternalServerError(error.message)
  }
}

module.exports = sendMail
