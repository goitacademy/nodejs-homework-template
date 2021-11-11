const Joi = require('joi')
const { regex, subscriptions } = require('../helpers')

const joiPostPutContactSchema = Joi.object({
  name: Joi.string()
    .alphanum()
    .min(3)
    .required(),
  email: Joi.string()
    .pattern(regex.emailRegex)
    .required(),
  phone: Joi.string()
    .pattern(regex.phoneRegex)
    .required(),
})

const joiPatchContactSchema = Joi.object({
  name: Joi.string()
    .alphanum()
    .min(3)
    .optional(),
  email: Joi.string()
    .pattern(regex.emailRegex)
    .optional(),
  phone: Joi.string()
    .pattern(regex.phoneRegex)
    .optional(),
})

const joiPatchStatusContactSchema = Joi.object({
  favorite: Joi.boolean().required(),
})

const joiUserSchema = Joi.object({
  email: Joi.string()
    .pattern(regex.emailRegex)
    .required(),
  password: Joi.string()
    .min(6)
    .required()
})

const joiPatchSubscriptionUserSchema = Joi.object({
  subscription: Joi.string().valid(...subscriptions).required(),
})

module.exports = {
  joiPostPutContactSchema,
  joiPatchContactSchema,
  joiPatchStatusContactSchema,
  joiUserSchema,
  joiPatchSubscriptionUserSchema
}
