const Joi = require('joi')
const { HttpCode } = require('../helpers/constants')

const schemaContacts = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    })
    .optional(),

  phone: Joi.string().required(),
  favorite: Joi.boolean().optional(),
})

const updateschemaContacts = Joi.object({
  name: Joi.string().min(3).max(30).optional(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    })
    .required(),

  phone: Joi.string().required(),
  favorite: Joi.boolean().required(),
}).min(1)

const updateschemaStatusContacts = Joi.object({
  favorite: Joi.boolean().optional(),
})

const validate = (schema, body, next) => {
  const { error } = schema.validate(body)
  if (error) {
    const [{ message }] = error.details
    return next({
      status: HttpCode.BAD_REQUEST,
      message,
      data: 'Bad Request',
    })
  }
  next()
}

module.exports.validateCreateContact = async (req, res, next) => {
  return await validate(schemaContacts, req.body, next)
}
module.exports.validateUpdateContact = async (req, res, next) => {
  return await validate(updateschemaContacts, req.body, next)
}

module.exports.validateUpdateStatus = async (req, res, next) => {
  return await validate(updateschemaStatusContacts, req.body, next)
}
