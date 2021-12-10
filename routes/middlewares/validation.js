const {
  contactSchema,
  registrationSchema,
  loginSchema,
  subscriptionSchema,
} = require('./validationSchemas')

const validation = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body)
    if (error) {
      error.status = 400
      next(error)
    }
    next()
  }
}

const contactValidator = validation(contactSchema)
const registrationValidator = validation(registrationSchema)
const loginValidator = validation(loginSchema)
const subscriptionValidator = validation(subscriptionSchema)

module.exports = {
  validation,
  contactValidator,
  registrationValidator,
  loginValidator,
  subscriptionValidator,
}
