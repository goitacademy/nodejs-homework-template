const Joi = require('joi');
const { HttpCode } = require('../helpers/constants');

const schemaCreateContact = Joi.object({
  name: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),

  email: Joi.string()
    .email({
      minDomainSegments: 2, tlds: { allow: ['com', 'net'] }
    })
    .required(),

  phone: Joi.string()
    .pattern(/^(\+)?((\d{2,3}) ?\d|\d)(([ -]?\d)|( ?(\d{2,3}) ?)){5,12}\d$/)
    .required(),
})

const schemaUpdateContact = Joi.object({
  name: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .optional(),

  email: Joi.string()
    .email({
      minDomainSegments: 2, tlds: { allow: ['com', 'net'] }
    }).optional(),

  phone: Joi.string()
    .pattern(/^(\+)?((\d{2,3}) ?\d|\d)(([ -]?\d)|( ?(\d{2,3}) ?)){5,12}\d$/)
    .optional(),
})

const validate = (schema, body, next) => {
  if (Object.keys(body).length === 0) {
    return next({ status: HttpCode.BAD_REQUEST, message: 'missing fields' })
  }
  const { error } = schema.validate(body);
  if (error) {
    const [{ message }] = error.details;
    return next({ status: HttpCode.BAD_REQUEST, message })
  }
  next()
}

const validateCreateContact = (req, res, next) => {
  return validate(schemaCreateContact, req.body, next)
}

const validateUpdateContact = (req, res, next) => {
  return validate(schemaUpdateContact, req.body, next)
}

module.exports = {
  validateCreateContact,
  validateUpdateContact,
}
