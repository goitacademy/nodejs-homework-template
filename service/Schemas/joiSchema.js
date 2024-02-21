const Joi = require("joi");

const schema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "Missing required 'name' - field",
  }),

  email: Joi.string().email().required().messages({
    "any.required": "Missing required 'email' - field",
  }),

  phone: Joi.string().required().messages({
    "any.required": "Missing required 'phone' - field",
  }),
});

module.exports = schema;
