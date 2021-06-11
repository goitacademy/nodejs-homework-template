const Joi = require('joi')

const schemaCreateContact = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .lowercase()
    .required(),
  phone: Joi.string()
    .regex(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im)
    .required(),
})

const schemaUpdateContact = Joi.object({
  name: Joi.string().min(3).max(30).optional(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .lowercase()
    .optional(),
  phone: Joi.string()
    .regex(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im)
    .optional(),
})

const validate = async (schema, body, next) => {
  try {
    await schema.validateAsync(body)
    next()
  } catch (error) {
    next({ status: 400, message: `Field ${error.message.replace(/"/g, '')}` })
  }
}

module.exports.validateCreateContact = (req, _res, next) => {
  return validate(schemaCreateContact, req.body, next)
}

module.exports.validateUpdateContact = (req, _res, next) => {
  return validate(schemaUpdateContact, req.body, next)
}
