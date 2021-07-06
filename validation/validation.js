const Joi = require('joi')
const { HttpCode } = require('../helpers/constants')

const schemaCreate = Joi.object({
  name: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),

  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),

  phone: Joi.string()
    .length(10).pattern(/^[0-9]+$/).required(),

  favorite: Joi.boolean().optional(),

  owner: Joi.object().optional(),
})

const schemaUpdate = Joi.object({
  name: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .optional(),

  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).optional(),

  phone: Joi.string()
    .length(10).pattern(/^[0-9]+$/).optional(),

  favorite: Joi.boolean().optional(),

  owner: Joi.object().optional(),
})

const validate = (schema, body, next) => {
  const { error } = schema.validate(body)
  if (error) {
    const [{ message }] = error.details
    return next({
      status: HttpCode.BAD_REQUEST,
      message: `Field: ${message.replace(/"/g, '')}`,
      data: 'Bad Request',
    })
  }
  next()
}

module.exports.validateCreateContact = (req, res, next) => {
  return validate(schemaCreate, req.body, next)
}

module.exports.validateUpdateContact = (req, res, next) => {
  return validate(schemaUpdate, req.body, next)
}
