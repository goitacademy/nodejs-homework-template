const Joi = require("joi");

const addSchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(3)
    .required()
    .messages({
      "any.required": "missing fields",
      "string.base": "Name must be a string",
      "string.empty": "missing required name field",
      "string.min": "Name should have a minimum length of {#limit}",
    })
    ,
  email: Joi.string()
    .trim()
    .email()
    .required()
    .messages({
      "any.required": "missing fields",
      "string.base": "Email must be a string",
      "string.empty": "missing required email field",
      "string.email": "Email must be a valid email address",
    }),
  phone: Joi.string()
    .trim()
    .regex(/^\+?[()\-\d]+$/)
    .min(9)
    .max(16)
    .required()
    .messages({
      "any.required": "missing fields",
      "string.base": "Phone number must be a string",
      "string.empty": "missing required phone field",
      "string.pattern.base": "Phone number is invalid",
      "string.min": "Phone number should have a minimum length of {#limit}",
      "string.max": "Phone number should have a maximum length of {#limit}",
    }),
});

module.exports = {
  addSchema,
};
