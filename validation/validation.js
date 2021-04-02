const Joi = require('joi')
const { codes } = require('../helpers/constants')
const schemaCreate = Joi.object({
  name: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
  password: Joi.number().integer().min(3).max(8).required(),
})

const schemaUpdate = Joi.object({
  name: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .optional(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).optional(),
  password: Joi.number().integer().min(3).max(8).optional(),
})

const validate = (schema, body, next) => {
  const { err } = schema(body)
  if (err) {
    const [{ message }] = err.details
    return next({
      status: 'Bad request',
      message,
      code: codes.BAD_REQUEST,
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
