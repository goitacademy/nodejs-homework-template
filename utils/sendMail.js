const nodemailer = require('nodemailer')
require('dotenv').config()

const { EMAIL_PASSWORD } = process.env

const nodemailerConfig = {
  host: 'smtp.meta.ua',
  port: 465, // 25, 465, 2255 нужно убедится в правильности
  secure: true,
  auth: {
    user: 'pro100flash@meta.ua',
    pass: EMAIL_PASSWORD,
  },
}

const transporter = nodemailer.createTransport(nodemailerConfig)

const sendMail = async data => {
  try {
    const email = { ...data, from: nodemailerConfig.auth.user }
    await transporter.sendMail(email)
  } catch (error) {
    console.log(error)
  }
}

module.exports = sendMail
