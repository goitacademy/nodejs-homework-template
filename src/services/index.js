const { ContactServices } = require('./contacts')
const { UserServices } = require('./users')
const { AuthServices } = require('./auth')
const { EmailServices } = require('./email')

const contactServices = new ContactServices()
const userServices = new UserServices()
const authServices = new AuthServices()
const emailServices = new EmailServices()

module.exports = { contactServices, userServices, authServices, emailServices }