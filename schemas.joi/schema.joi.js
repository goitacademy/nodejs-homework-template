const Joi = require("joi");

const schemaPostContact = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  phone: Joi.string().required(),
  favorite: Joi.bool(),
});

const schemaPutContact = Joi.object({
  name: Joi.string(),
  email: Joi.string().email({ minDomainSegments: 2 }),
  phone: Joi.string(),
}).min(1);

const schemaPatchContact = Joi.object({
  favorite: Joi.bool().required(),
});

module.exports = { schemaPostContact, schemaPutContact, schemaPatchContact };
