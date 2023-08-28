const Joi = require("joi");

const contactSchema = Joi.object({
  name: Joi.string()
    .regex(/^[A-Za-z]+$/)
    .min(3)
    .max(20)
    .required()
    .messages({
      "any.required": "missing required name field",
      "string.min": "name should be at least {#limit} characters",
      "string.max": "name should be at most {#limit} characters",
      "string.pattern.base": "name should contain only letters",
    }),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "uk"] } })
    .required()
    .messages({
      "any.required": "missing required email field",
      "string.email": "invalid email format",
    }),
  phone: Joi.string()
    .pattern(/^\(\d{3}\)\s\d{3}-\d{4}$/)
    .required()
    .messages({
      "any.required": "missing required phone field",
      "string.pattern.base": "invalid phone number format",
    }),
});

module.exports = contactSchema;
