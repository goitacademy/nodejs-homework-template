const Joi = require('joi')

const { HttpCode } = require('../helpers/constants')

module.exports.validateRegistration = (req, res, next) => {
  const schemaRegistration = Joi.object({
    email: Joi.string().email().min(5).max(256).required(),
    password: Joi.string().min(8).max(20).required(),
  })

  const { error } = schemaRegistration.validate(req.body)

  if (error) {
    const [{ message }] = error.details
    return next({
      status: HttpCode.BAD_REQUEST,
      code: HttpCode.BAD_REQUEST,
      message: `Missing fields: ${message.replace(/"/g, '')}`,
      data: 'Bad request',
    })
  }
  next()
}

module.exports.validateLogin = (req, res, next) => {
  const schemaLogin = Joi.object({
    email: Joi.string().email().min(5).max(256).required(),
    password: Joi.string().min(8).max(20).required(),
  })

  const { error } = schemaLogin.validate(req.body)

  if (error) {
    const [{ message }] = error.details
    return next({
      status: HttpCode.BAD_REQUEST,
      code: HttpCode.BAD_REQUEST,
      message: `Missing fields: ${message.replace(/"/g, '')}`,
      data: 'Bad request',
    })
  }
  next()
}
