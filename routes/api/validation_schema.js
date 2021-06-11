const Joi = require('joi')

const phoneRegEx =
  /\+?([0-9]*)([ .-]?)\(?([0-9]{3})\)?([ .-]?)([0-9]{3})([ .-]?)([0-9]{2})([ .-]?)([0-9]{2})/

const schemaAddContact = Joi.object({
  name: Joi.string().min(2).max(40).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
  phone: Joi.string().min(3).max(18).pattern(phoneRegEx).required(),
})

const schemaUpdateContact = Joi.object({
  name: Joi.string().min(2).max(40).optional(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .optional(),
  phone: Joi.string().min(3).max(18).pattern(phoneRegEx).optional(),
})

const validate = (schema, object, next) => {
  const { error } = schema.validate(object)

  if (error) {
    const [{ message }] = error.details

    return next({
      status: 400,
      message: `Filed: ${message.replace(/"/g, '')}`,
    })
  }

  next()
}

module.exports.addContact = (req, res, next) => {
  return validate(schemaAddContact, req.body, next)
}

module.exports.updateContact = (req, res, next) => {
  return validate(schemaUpdateContact, req.body, next)
}
