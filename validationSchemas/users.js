const Joi = require('joi')
const subscriptionUserSchema = Joi.object({
  id: Joi.string().required(),
  subscription: Joi.string().valid(...['starter', 'pro', 'business']).insensitive().required(),
})

module.exports = { subscriptionUserSchema }