const Joi = require('joi')
const { codes } = require('../helpers/constants')
const schemaCreate = Joi.object({
  name: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
  phone: Joi.string().alphanum()
    .min(9)
    .max(11)
    .required(),
})

const schemaUpdate = Joi.object({
  name: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .optional(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).optional(),
  phone: Joi.string().alphanum()
    .min(9)
    .max(11).optional(),
}).min(1)

const statusUpdate = Joi.object({
  favorite: Joi.boolean().required()
})


const validate = (schema, body, next) => {
  const { error } = schema.validate(body)
  if (error) {
    const [{ message }] = error.details
    return next({
      status: codes.BAD_REQUEST,
      code: codes.BAD_REQUEST,
      message: message.replace(/"/g, ''),
    })
  }
  next()
}
module.exports.createContact = (req, res, next) => {
  return validate(schemaCreate, req.body, next)
}
module.exports.updateContact = (req, res, next) => {
  return validate(schemaUpdate, req.body, next)
}

module.exports.updateStatus = (req, res, next) => {
  return validate(statusUpdate, req.body, next)
}

