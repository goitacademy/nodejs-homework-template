const Joi = require('joi')
const schemaCreate = Joi.object({
  name: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),

  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),

  phone: Joi.string()
    .length(10).pattern(/^[0-9]+$/).required(),

  favorite: Joi.boolean().optional()

})

const schemaChange = Joi.object({
  name: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .optional(),

  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).optional(),

  phone: Joi.string()
    .length(10).pattern(/^[0-9]+$/).optional(),

  favorite: Joi.boolean().optional()

})

module.exports = {
  schemaCreate,
  schemaChange
}
