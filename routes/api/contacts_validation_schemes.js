const Joi = require("joi");

const schemaCreateContact = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    "any.required": "missing required name field",
  }),
  email: Joi.string().min(3).max(30).required().messages({
    "any.required": "missing required email field",
  }),
  phone: Joi.string()
    .pattern(/[0-9]+/)
    .required()
    .messages({
      "any.required": "missing required phone field",
    }),
});

module.exports = { schemaCreateContact };
