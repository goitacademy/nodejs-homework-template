const Joi = require('joi')
const { HttpCode } = require('../helpers/constants')

const schemaCreate = Joi.object({
  name: Joi.string().min(2).max(30).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] }
    })
    .required(),
  phone: Joi.string()
    .pattern(/^[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im)
    .required()
})

const schemaUpdate = Joi.object({
  name: Joi.string().min(2).max(30).optional(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] }
    })
    .optional(),
  phone: Joi.string()
    .pattern(/^[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im)
    .optional()
})

const schemaUpdateStatus = Joi.object({
  favorite: Joi.boolean().required()
})

const validateContact = (schema, body, next) => {
  const { error } = schema.validate(body)
  if (error) {
    const [{ message }] = error.details
    return next({
      status: HttpCode.BAD_REQUEST,
      message,
      data: 'Bad Request'
    })
  }
  next()
}

module.exports.validateCreateContact = (req, _, next) => {
  return validateContact(schemaCreate, req.body, next)
}

module.exports.validateUpdateContact = (req, _, next) => {
  return validateContact(schemaUpdate, req.body, next)
}

module.exports.validateUpdateContactStatus = (req, _, next) => {
  return validateContact(schemaUpdateStatus, req.body, next)
}
