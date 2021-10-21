const nodemailer = require('nodemailer')
require("botenv").config()

const { EMAIL_PASSWORD } = process.env

const nodemaileConfig = {
    host: 'mail.adm.tools',
    port: 25,
    secure: false,
    auth: {
        user: 'info@ntonyartist.com',
        pass: EMAIL_PASSWORD,
    }   
}

const transporter = nodemailer.createTransport(nodemaileConfig)

const email = {
  to: 'pavlykb(@gmail.com',
  from: 'info@ntonyartist.com',
  subject: 'Новая заявка пользователя',
  html: '<h1>Hello<h1>'
}

transporter.sendMail(email)
    .then(() => console.log("Email success send"))
    .catch(error => console.log(error.message))