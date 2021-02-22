const Joi = require('joi')

const { HttpCode } = require('../helpers/constants')

module.exports.validateAddContact = (req, res, next) => {
  const schemaAddContact = Joi.object({
    name: Joi.string().min(2).max(25).required(),
    email: Joi.string().email().min(5).max(256).required(),
    phone: Joi.string().min(5).max(20).required()
  })

  const { error } = schemaAddContact.validate(req.body)

  if (error) {
    const [{ message }] = error.details
    return next({
      status: HttpCode.BAD_REQUEST,
      code: HttpCode.BAD_REQUEST,
      message: `Missing fields: ${message.replace(/"/g, '')}`,
      data: 'Bad request'
    })
  }
  next()
}

module.exports.validateUpdateContact = (req, res, next) => {
  const schemaUpdateContact = Joi.object({
    name: Joi.string().min(2).max(25).optional(),
    email: Joi.string().email().min(5).max(256).optional(),
    phone: Joi.string().min(5).max(20).optional()
  })

  const { error } = schemaUpdateContact.validate(req.body)

  if (error || Object.keys(req.body).length === 0) {
    return next({
      status: HttpCode.BAD_REQUEST,
      code: HttpCode.BAD_REQUEST,
      message: 'Missing fields.',
      data: 'Bad request'
    })
  }
  next()
}
