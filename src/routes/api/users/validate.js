const Joi = require('joi')
const { SUBSCRIPTION_TYPE }
= require('../../../helpers/constants')
const validate = require("../../../helpers/validate")

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

module.exports.validationSignupUser = ({ body }, _, next) => {
  return validate(schemaSignupUser, body, next)
}
module.exports.validationLoginUser = ({ body }, _, next) => {
  return validate(schemaLoginUser, body, next)
}
module.exports.validationPatchSubscriptionUser = ({ body }, _, next) => {
  return validate(schemaPatchSubscriptionUser, body, next)
}