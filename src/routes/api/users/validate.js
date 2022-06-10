const Joi = require('joi')
const {
  HTTP_CODES,
  SUBSCRIPTION_TYPE,
} = require('../../../helpers/constants')

const schemaSignupUser = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['ua', 'com', 'net', 'org'] },
    })
    .required(),
  password: Joi.string().required(),
})
const schemaLoginUser = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['ua', 'com', 'net', 'org'] },
    })
    .required(),
  password: Joi.string().required(),
})

const schemaPatchSubscriptionUser = Joi.object({
  subscription: Joi.string()
    .required()
    .valid(...Object.values(SUBSCRIPTION_TYPE)),
})

const validate = async (schema, obj, next) => {
  try {
    await schema.validateAsync(obj)
    return next()
  } catch (error) {
    next({
      status: HTTP_CODES.BAD_REQUEST,
      message: error.message.replace(/"/g, ''),
    })
  }
}

module.exports.validationSignupUser = ({ body }, _, next) => {
  return validate(schemaSignupUser, body, next)
}
module.exports.validationLoginUser = ({ body }, _, next) => {
  return validate(schemaLoginUser, body, next)
}
module.exports.validationPatchSubscriptionUser = ({ body }, _, next) => {
  return validate(schemaPatchSubscriptionUser, body, next)
}