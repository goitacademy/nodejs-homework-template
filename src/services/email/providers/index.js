const { NodeMailerProvider } = require('./NodeMailerProvider')
const { SendGridProvider } = require('./SendGridProvider')

const ndMailer = new NodeMailerProvider()
const sgMailer = new SendGridProvider()

module.exports = { ndMailer, sgMailer }