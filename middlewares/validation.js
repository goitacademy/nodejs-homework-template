const Joi = require('joi')

const schemaCreateContact = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    })
    .required(),
  phone: Joi.string().length(11).required(),
})

const schemaUpdateContact = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).optional(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    })
    .optional(),
  phone: Joi.string().length(11).optional(),
  favorite: Joi.boolean().optional(),
})

const validate = async (schema, bodyContacts, next) => {
  const { name, email, phone } = bodyContacts
  try {
    await schema.validateAsync({ name, email, phone })
    next()
  } catch (err) {
    next({ status: 400, message: `Field ${err.message.replace(/"/g, "'")}` })
  }
}

module.exports.validateCreateContact = (req, _res, next) => {
  return validate(schemaCreateContact, req.body, next)
}

module.exports.validateUpdateContact = (req, _res, next) => {
  return validate(schemaUpdateContact, req.body, next)
}
