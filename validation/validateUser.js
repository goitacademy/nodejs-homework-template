const Joi = require('joi')

const schemaCreateUser = Joi.object({
  name: Joi.string().min(3).max(30).optional(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-z0-9][a-zA-z0-9][a-zA-z0-9][a-zA-z0-9][a-zA-z0-9]$')).required()
})

// /\S+@\S+\.\S+/
// const schemaUpdateContact = Joi.object({
//   name: Joi.string().alphanum().min(3).max(30).optional(),
//   email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).optional(),
//   phone: Joi.string().pattern(new RegExp('^[0-9]{3,30}$')).optional()
// })

const schemaUpdateSubscriptionUser = Joi.object({
  subscription: Joi.string().pattern(new RegExp('^starter$|^pro$|^business$')).required()
})

const validate = (schema, body, next) => {
  const { error } = schema.validate(body)
  if (error) {
    const [{ message }] = error.details
    return next({
      code: 400,
      message: `${message.replace(/"/g, '')}`
    })
  }
  next()
}

module.exports.validateCreateUser = (req, res, next) => {
  return validate(schemaCreateUser, req.body, next)
}

// module.exports.validateUpdateContact = (req, res, next) => {
//   return validate(schemaUpdateContact, req.body, next)
// }

module.exports.validateUpdateSubscriptionUser = (req, res, next) => {
  return validate(schemaUpdateSubscriptionUser, req.body, next)
}
