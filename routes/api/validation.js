const Joi = require('joi')

const schemaCreateContact = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  phone: Joi.string().length(11).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    })
    .required(),
  favorite: Joi.boolean().optional(),
})

const schemaUpdateContact = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).optional(),
  phone: Joi.string().length(11).optional(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    })
    .optional(),
  favorite: Joi.boolean().optional(),
})

const validate = async (schema, body, next) => {
  const { favorite, name, email, phone } = body
  try {
    await schema.validateAsync({
      favorite,
      name,
      email,
      phone,
    })
    next()
  } catch (error) {
    console.log({
      status: 400,
      message: `Field ${error.message.replace(/"/g, "'")}`,
    })
    next(error)
  }
}

module.exports.validateCreateContact = (req, _res, next) => {
  return validate(schemaCreateContact, req.body, next)
}

module.exports.validateUpdateContact = (req, _res, next) => {
  return validate(schemaUpdateContact, req.body, next)
}
