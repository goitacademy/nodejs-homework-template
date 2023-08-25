const Joi = require("joi");

const contactsScheme = Joi.object({
  name: Joi.string()
    .pattern(/^\w+(\s+\w+)*$/)
    .min(3)
    .max(30)
    .required()
    .messages({
      "string.base": "Name should be a string",
      "string.pattern.base": "Invalid name format",
      "string.min": "Name must be at least 3 characters",
      "string.max": "Name cannot be more than 30 characters",
      "any.required": "Missing required name field",
    }),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required()
    .messages({
      "string.base": "Email should be a string",
      "string.email": "Invalid email format",
      "any.required": "Missing required email field",
    }),
  phone: Joi.string()
    .regex(/^\s*(?:\(\d{1,4}\)\s*)?[\d\s-]+\s*$/)
    .required()
    .messages({
      "string.base": "Phone should be a string",
      "string.pattern.base": "Invalid phone format",
      "any.required": "Missing required phone field",
    }),
});

module.exports = contactsScheme;
