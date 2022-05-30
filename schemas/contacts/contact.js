const Joi = require("joi");

const schema = Joi.object({
  name: Joi.string().min(2).max(30).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "gmail"] } })
    .required(),
  phone: Joi.string().required().allow("-"),
});

module.exports = schema;
