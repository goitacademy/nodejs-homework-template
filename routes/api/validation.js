const Joi = require('joi')

const schemaCreateContact = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().min(3).max(30).required(),
  phone: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/)
    .required(),
  subscription: Joi.string().optional(),
  password: Joi.string().optional(),
  token: Joi.string().optional(),
})

const schemaUpdateContact = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).optional(),
  email: Joi.string().email().min(3).max(30).optional(),
  phone: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/)
    .optional(),
  subscription: Joi.string().optional(),
  password: Joi.string().optional(),
  token: Joi.string().optional(),
})

const validate = (schema, obj, next) => {
  const { error } = schema.validate(obj)
  if (error) {
    const [{ message }] = error.details
    return next({
      status: 400,
      message: `Filed: ${message.replace(/'/g, '')}`,
    })
  }
  next()
}

module.exports.createContact = (req, res, next) => {
  return validate(schemaCreateContact, req.body, next)
}

module.exports.updateContact = (req, res, next) => {
  return validate(schemaUpdateContact, req.body, next)
}
