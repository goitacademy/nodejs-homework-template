const Joi = require('joi')
const {
  constants: { subcriptionValue },
} = require('../utils')

const userSubscriptionUpdateSchema = Joi.object({
  subscription: Joi.any().valid(...subcriptionValue),
})

module.exports = userSubscriptionUpdateSchema
