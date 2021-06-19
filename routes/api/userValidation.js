const Joi = require('joi')

const addUserSchema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['ua', 'gmail', 'com', 'net', 'org'] }
    })
    .required(),
  password: Joi.string().required()
})

const userUpdateSubscriptionSchema = Joi.object({
  subscription: Joi.boolean().required()
})

module.exports = {
  addUserSchema,
  userUpdateSubscriptionSchema
}
