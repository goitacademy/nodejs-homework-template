const { ContactServices } = require('./contacts')
const { UserServices } = require('./users')
const { AuthServices } = require('./auth')

const contactServices = new ContactServices()
const userServices = new UserServices()
const authServices = new AuthServices()

module.exports = { contactServices, userServices, authServices }