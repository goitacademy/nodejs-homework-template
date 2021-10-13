const Joi = require('joi')
const {
  constants: { subcriptionValue },
} = require('../utils')

const userSchema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net', 'org', 'ua', 'ru', 'gov', 'uk'] },
    })
    .required(),
  password: Joi.string().min(6).required(),
  subscription: Joi.any().valid(...subcriptionValue),
})

module.exports = userSchema
