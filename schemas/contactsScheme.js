const Joi = require("joi");

const contactsScheme = Joi.object({
  name: Joi.string()
    .pattern(/^\w+(\s+\w+)*$/)
    .min(3)
    .max(30)
    .required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  phone: Joi.string()
    .regex(/^\s*(?:\(\d{1,4}\)\s*)?[\d\s-]+\s*$/)
    .required(),
});

module.exports = contactsScheme;
