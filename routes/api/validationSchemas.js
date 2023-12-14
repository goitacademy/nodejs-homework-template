const Joi = require("joi");

const contactSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "Missing required name field",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Invalid email format",
    "any.required": "Missing required email field",
  }),
  phone: Joi.string().required().messages({
    "any.required": "Missing required phone field",
  }),
});

module.exports = contactSchema;
