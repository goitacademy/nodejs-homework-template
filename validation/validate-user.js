const Joi = require('joi')
const { HttpCode } = require('../helpers/constants')

const schemaUsers = Joi.object({
  name: Joi.string().min(3).max(30).optional(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    })
    .required(),

  password: Joi.string().min(6).required(),
})

const loginschemaUsers = Joi.object({
  name: Joi.string().min(3).max(30).optional(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    })
    .required(),

  password: Joi.string().min(6).required(),
})

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

module.exports.validateCreateUser = async (req, res, next) => {
  return await validate(schemaUsers, req.body, next)
}
module.exports.validateLogin = async (req, res, next) => {
  return await validate(loginschemaUsers, req.body, next)
}

// module.exports.validateUpdateStatus = async (req, res, next) => {
//   return await validate(updateschemaStatusContacts, req.body, next)
// }
