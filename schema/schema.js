const Joi = require("joi");

const schemaPostContact = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  phone: Joi.string().required(),
});

const schemaPutContact = Joi.object({
  name: Joi.string().alphanum(),
  email: Joi.string().email({ minDomainSegments: 2 }),
  phone: Joi.string(),
}).min(1);
module.exports = { schemaPostContact, schemaPutContact };
