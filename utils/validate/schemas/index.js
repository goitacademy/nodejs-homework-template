const addContactSchema = require('./addContactSchema')
const updateContactSchema = require('./updateContactSchema')
const registrationValidate = require('./registration')
const updateSubscriptionValidate = require('./updateSubscription')

module.exports = {
  addContactSchema,
  updateContactSchema,
  registrationValidate,
  updateSubscriptionValidate
}
