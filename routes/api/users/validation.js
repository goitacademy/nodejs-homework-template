const Joi = require('joi')
const { HttpCode } = require('../../../helpers/constants')

// Status: 400 Bad Request
// Content-Type: application/json
// ResponseBody: <Ошибка от Joi или другой валидационной библиотеки></Ошибка>

// === schema CREATE ===
const schemaCreateUser = Joi.object({
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
      status: 'Bad Request',
      code: HttpCode.BAD_REQUEST,
      data: `error: ${error.message}`,
    })
  }

  if (error) {
    const field = error.details[0].path[0]

    return next({
      status: HttpCode.BAD_REQUEST,
      message: `missing required ${field} field`,
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
