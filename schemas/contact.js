const Joi = require('joi')

const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'uk', 'ca', 'org'] } }).required(),
  phone: Joi.number().required()
})

module.exports = schema
