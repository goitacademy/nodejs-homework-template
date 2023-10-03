const Joi = require("joi");

const contactSchema = Joi.object({
  name: Joi.string().required().pattern(/[A-Z][a-z]+\s[A-Z][a-z]+/).messages({
    "any.required": "missing required name field",
    'string.pattern.base': '{{#label}} with value {:[.]} fails to match the required pattern, example: "Example Example"',
  }),
  email: Joi.string().email().required().messages({
    "any.required": "missing required email field",
    
  }),
  phone: Joi.string().length(14).pattern(/\(\d{3}\)\s{1}\d{3}\-\d{4}/).required().messages({
    "any.required": "missing required phone field",
    'string.pattern.base': '{{#label}} with value {:[.]} fails to match the required pattern, example: "(000) 000-0000"',
  }),
});

module.exports = contactSchema