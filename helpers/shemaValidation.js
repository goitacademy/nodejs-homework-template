const Joi = require("joi");

const schema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "dot"] } })
    .required(),
  phone: Joi.string().max(14).required(),
});

module.exports = schema;
