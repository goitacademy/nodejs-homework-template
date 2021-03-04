const Joi = require('joi')

const registerUserSchema = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
  password: Joi.string().alphanum().min(2).max(30).required(),
  subscription: Joi.string().optional(),
  name: Joi.string().alphanum().min(2).max(30).optional(),
})

const loginUserSchema = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
  password: Joi.string().alphanum().min(2).max(30).required(),
})

const validate = (schema, obj, next) => {
  const { error } = schema.validate(obj)
  if (error) {
    const [{ message }] = error.details
    return next({
      status: 400,
      message: `Filed: ${message.replace(/"/g, '')}`
    })
  }
  next()
}

const registerUserValidation = (req, res, next) => {
  return validate(registerUserSchema, req.body, next)
}

const loginUserValidation = (req, res, next) => {
  return validate(loginUserSchema, req.body, next)
}

module.exports = { registerUserValidation, loginUserValidation }
