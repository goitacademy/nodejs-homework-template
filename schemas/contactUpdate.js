const Joi = require('joi')

const contactUpdateSchema = Joi.object({
  name: Joi.string().min(2).max(30).optional(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net', 'org', 'ua', 'ru', 'gov'] },
    })
    .optional(),
  phone: Joi.string().min(2).max(15).optional(),
  favorite: Joi.boolean().optional(),
}).or('name', 'email', 'phone', 'favorite')

module.exports = contactUpdateSchema
