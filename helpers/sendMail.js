const nodemailer = require('nodemailer')
require('dotenv').config()

const { META_PASSWORD } = process.env

const nodemailerConfig = {
  host: 'smtp.meta.ua',
  port: 465,
  secure: true,
  auth: {
    user: 'juldm@meta.ua',
    pass: META_PASSWORD,
  },
}

const transporter = nodemailer.createTransport(nodemailerConfig)

const sendMail = async (data) => {
  try {
    const email = { ...data, from: nodemailerConfig.auth.user }
    await transporter.sendMail(email)
  } catch (error) {
    console.log(error)
  }
}

module.exports = sendMail
