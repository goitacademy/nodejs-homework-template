const Joi = require('joi')

const contactAddSchema = Joi.object({
  name: Joi.string().min(2).max(30).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net', 'org', 'ua', 'ru', 'gov'] },
    })
    .required(),
  phone: Joi.string().min(2).max(30).required(),
})

module.exports = contactAddSchema
