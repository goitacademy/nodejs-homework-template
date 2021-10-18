const Joi = require('joi')

const userEmailSchema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net', 'org', 'ua', 'ru', 'gov', 'uk'] },
    })
    .required(),
})

module.exports = userEmailSchema
