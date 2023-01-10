const Joi = require('joi')
const { subscriptionTypes } = require('../../db/userModel')

const subscribtionSchema = Joi.object({
    subscription: Joi.string()
    .valid(...subscriptionTypes)
    .required(),
})

module.exports = {
    subscribtionSchema
}