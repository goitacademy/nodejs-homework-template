const Joi = require("joi");

const addSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),

  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: false } })
    .required(),

  phone: Joi.string().min(10).max(15).required(),
});

module.exports = addSchema;
