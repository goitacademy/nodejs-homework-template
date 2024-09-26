const Joi = require('joi');


const contactSchemaPost = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean().required().default(false)
})

const contactSchemaPut = Joi.object({
  name: Joi.string(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
  phone: Joi.string()
}).or("name","email","phone")

const contactSchemaPatch = Joi.object({
  favorite: Joi.boolean().required()
})


module.exports = {
    contactSchemaPost,
    contactSchemaPut,
    contactSchemaPatch
}