const Joi = require('joi')

const contactAddSchema = Joi.object({
  name: Joi.string().min(2).max(30).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net', 'org', 'ua', 'ru', 'gov', 'uk'] },
    })
    .required(),
  phone: Joi.string().min(7).max(15).required(),
  favorite: Joi.boolean,
})

module.exports = contactAddSchema
