const nodemailer = require('nodemailer')
const smtpTransport = require('nodemailer-smtp-transport')

require('dotenv-expand')(require('dotenv').config())

const { NODEMAILER_GOOGLE_USER, NODEMAILER_GOOGLE_PASSWORD } = process.env

class NodeMailerProvider {
  async send({ to, from, subject, html }) {
    const transporter = nodemailer.createTransport(
      smtpTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        auth: {
          user: NODEMAILER_GOOGLE_USER,
          pass: NODEMAILER_GOOGLE_PASSWORD,
        },
      }),
    )
    await transporter.sendMail({ to, from, subject, html })
  }
}
module.exports = { NodeMailerProvider }