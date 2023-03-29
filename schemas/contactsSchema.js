const Joi = require("joi");

const schema = Joi.object({
  name: Joi.string().trim().required(),
  email: Joi.string().trim().email({ minDomainSegments: 2 }).required(),
  phone: Joi.string().trim().required(),
}).min(1).required();

module.exports = schema;