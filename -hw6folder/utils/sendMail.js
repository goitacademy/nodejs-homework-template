const nodemailer = require('nodemailer')
require('dotenv').config()
const { InternalServerError } = require('http-errors') // 500 помилка сервера

// const { EMAIL_PASSWORD, EMAIL_USER, EMAIL_TO } = process.env
const { EMAIL_PASSWORD, EMAIL_USER, } = process.env

/* Створюєм налаштування nodemailerConfig */
const nodemailerConfig = {
  host: 'smtp.meta.ua',
  port: 465, // 25, 465, 2255
  secure: true, // для 465;  для 25, 2255 - false;
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASSWORD,
  },
}

const transporter = nodemailer.createTransport(nodemailerConfig)

/** Функція з динамічними параметрами sendMail

data = {
    to: "",
    subject: '',
    html: '',
}
*/
const sendMail = async (data) => {
  try {
    const email = { ...data, from: EMAIL_USER }
    await transporter.sendMail(email)
  } catch (error) {
    // return false
    throw new InternalServerError(error.message)
  }
}

module.exports = sendMail
