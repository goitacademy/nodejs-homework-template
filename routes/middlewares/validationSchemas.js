const Joi = require('joi')

const contactSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
    })
    .required(),
  phone: Joi.string().min(10).max(15).required(),
  favorite: Joi.boolean(),
})

const registrationSchema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
    })
    .required(),
  password: Joi.string().min(5).max(15).required(),
  subscription: Joi.string(),
  token: Joi.string(),
})

const loginSchema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
    })
    .required(),
  password: Joi.string().min(5).max(15).required(),
})

const subscriptionSchema = Joi.object({
  subscription: Joi.string().valid('starter', 'pro', 'business'),
})

module.exports = {
  contactSchema,
  registrationSchema,
  loginSchema,
  subscriptionSchema,
}
