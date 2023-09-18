const Joi = require('joi');


const contactSchemaPost = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
  phone: Joi.string().required()
})

const contactSchemaPut = Joi.object({
  name: Joi.string(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
  phone: Joi.string()
}).or("name","email","phone")

module.exports = {
    contactSchemaPost,
    contactSchemaPut
}