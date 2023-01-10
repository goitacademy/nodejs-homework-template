const Joi = require('joi')
const { subscriptionTypes } = require('../../db/userModel')

const subscriptionValidation = Joi.object({
    subscription: Joi.string()
    .valid(...subscriptionTypes)
    .required(),
})

module.exports = {
    subscriptionValidation
}