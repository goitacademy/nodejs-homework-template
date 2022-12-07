const Joi = require('joi');

const contactSchemaAdd = Joi.object({
  name: Joi.string().min(2).max(40).required(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
  phone: Joi.string().min(7).max(18).required(),
});

const contactSchemaUpdate = Joi.object({
  name: Joi.string().min(2).max(40),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
  phone: Joi.string().min(7).max(18),
}).min(1);

module.exports = {
  contactSchemaAdd,
  contactSchemaUpdate,
}