const Joi = require('joi')

const contactSchema = Joi.object({
  name: Joi.string().min(2).max(30).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net', 'org', 'ua', 'ru', 'gov'] },
    })
    .required(),
  // phone: Joi.string()
  //   .pattern(/^([+]?\d{1,2}[-\s]?|)\d{3}[-\s]?\d{3}[-\s]?\d{4}$/)
  //   .required(),
  phone: Joi.string().min(2).max(30).required(),
})
console.log('joi.object:', Joi.object)
module.exports = contactSchema
