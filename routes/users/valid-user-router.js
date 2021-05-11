const Joi = require('joi')
const { subscription, HttpCode } = require('../../helpers/constants')

const schemaAddUser = Joi.object({
  name: Joi.string()
    .min(3)
    .max(30)
    .pattern(/[A-Z]\w+/)
    .optional(),

  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),

  password: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    .required(),

  subscription: Joi.string()
    .valid(subscription.STARTER, subscription.PRO, subscription.BUSINESS)
    .optional()
})

const schemaLogin = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),

  password: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    .required(),
})

const schemaUpdateSubscriptionUser = Joi.object({
  subscription: Joi.string()
    .valid(subscription.STARTER, subscription.PRO, subscription.BUSINESS)
    .required(),
})

const validate = async (schema, obj, next) => {
  try {
    await schema.validateAsync(obj)
    return next()
  } catch (err) {
    console.log(err)
    next({ status: HttpCode.BAD_REQUEST, message: err.message.replace(/"/g, "'") })
  }
}

module.exports = {
  validateCreateUser: async (req, res, next) => {
    return await validate(schemaAddUser, req.body, next)
  },
   validateUpdateSubscription: async (req, res, next) => {
    return await validate(schemaUpdateSubscriptionUser, req.body, next)
  },
   validateLogin: async (req, res, next) => {
    return await validate(schemaLogin, req.body, next)
  },
}