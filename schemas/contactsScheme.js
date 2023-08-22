const Joi = require("joi");

const contactsScheme = Joi.object({
  name: Joi.string()
    .pattern(/^\w+(\s+\w+)*$/)
    .min(3)
    .max(30)
    .required()
    .messages({
      "any.required": "missing required name field",
    }),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required()
    .messages({
      "any.required": "missing required email field",
    }),
  phone: Joi.string()
    .regex(/^\s*(?:\(\d{1,4}\)\s*)?[\d\s-]+\s*$/)
    .required()
    .messages({
      "any.required": "missing required phone field",
    }),
});

module.exports = contactsScheme;
