const Joi = require('joi')
const { HttpCode } = require('../../../helpers/constants')

// === schema CREATE ===
const schemaCreateUser = Joi.object({
  name: Joi.string().min(2).max(60).required(),

  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    })
    .required(),

  password: Joi.string().required(),

  subscription: Joi.string().optional(),
})

const validate = (schema, obj, next) => {
  const { error } = schema.validate(obj)

  if (Object.keys(obj).length === 0) {
    return next({
      status: 'error',
      code: HttpCode.BAD_REQUEST,
      data: `error: ${error.message}`,
    })
  }

  if (error) {
    const field = error.details[0].path[0]

    return next({
      status: 'error',
      code: HttpCode.BAD_REQUEST,
      data: { message: `missing required ${field} field` },
    })
  }
  next()
}

const createUser = (req, _res, next) => {
  return validate(schemaCreateUser, req.body, next)
}

module.exports = {
  createUser,
}
