const Joi = require("joi");

const contactValidate = Joi.object({
  name: Joi.string().alphanum().min(2).max(30).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  phone: Joi.string()
    .min(2)
    .max(12)
    .pattern(/^[0-9]+$/)
    .required(),
});

module.exports = contactValidate;
