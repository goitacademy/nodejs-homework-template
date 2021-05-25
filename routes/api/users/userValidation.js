const Joi = require('joi')
const { SUBSCRIPTION } = require('../../../helpers/constants')

const userRegistrationSchema = Joi.object({
  name: Joi.string().alphanum().min(2).optional(),
  password: Joi.string().alphanum().min(6).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    })
    .required(),

  subscription: Joi.string()
    .valid(SUBSCRIPTION.STARTER, SUBSCRIPTION.PRO, SUBSCRIPTION.BUSINESS)
    .optional()
    .default(SUBSCRIPTION.STARTER),
})

const userLogInSchema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    })
    .required(),
  password: Joi.string().alphanum().min(6).required(),
})

const userUpdateSubscriptionSchema = Joi.object({
  subscription: Joi.string()
    .valid(SUBSCRIPTION.STARTER, SUBSCRIPTION.PRO, SUBSCRIPTION.BUSINESS)
    .required(),
})

const validate = async (schema, userObj, next) => {
  try {
    await schema.validateAsync(userObj)
    return next()
  } catch (err) {
    next({ status: 400, message: err.message })
  }
}

module.exports = {
  validateUserRegistration: async (req, res, next) => {
    return await validate(userRegistrationSchema, req.body, next)
  },
  validateUserLoggingIn: async (req, res, next) => {
    return await validate(userLogInSchema, req.body, next)
  },
  validateUpdatingUserSubscription: async (req, res, next) => {
    return await validate(userUpdateSubscriptionSchema, req.body, next)
  },
}
