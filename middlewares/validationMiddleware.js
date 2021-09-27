const Joi = require('joi')

const addContactValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).optional(),
    phone: Joi.string().min(9).max(20).required()
  })

  const validationResult = schema.validate(req.body)

  if (validationResult.error) {
    return res.status(400).json({ status: validationResult.error.details })
  }

  next()
}

const patchContactValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().alphanum().min(3).max(30).optional(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).optional(),
    phone: Joi.string().min(9).max(20).optional()
  })

  const validationResult = schema.validate(req.body)

  if (validationResult.error) {
    return res.status(400).json({ status: validationResult.error.details })
  }
  next()
}

module.exports = { addContactValidation, patchContactValidation }
