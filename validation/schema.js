const Joi = require("joi");

const schema = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    "string.base": "Name must be a string",
    "string.min": "Name must be at least {#limit} characters long",
    "string.max": "Name cannot be longer than {#limit} characters",
    "any.required": "missing required name field",
  }),
  email: Joi.string().email().required().messages({
    "string.base": "Email must be a string",
    "string.email": "Invalid email format",
    "any.required": "missing required email field",
  }),
  phone: Joi.string().required().messages({
    "string.base": "Phone must be a string",
    "any.required": "missing required phone field",
  }),
});

module.exports = schema;
