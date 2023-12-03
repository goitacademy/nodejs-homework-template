// /nodemailer.js
const nodemailer = require('nodemailer')
const { PASSWORD_SEND, EMAIL_SEND } = require("./variables");

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: EMAIL_SEND,
    pass: PASSWORD_SEND
  }
})

module.exports = {
    transporter
}