const Joi = require("joi");

const addSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": " 'name' is missing",
  }),
  email: Joi.string().email().required().messages({
    "any.required": " 'email' is missing",
  }),
  phone: Joi.string()
    .pattern(
      /^((\+)?(3)?(8)?[- ]?)?(\(?\d{3}\)?[- ]?)?\d{3}[- ]?\d{2}[- ]?\d{2}$/
    )
    .required()
    .messages({
      "any.required": " 'phone' is missing",
      "string.pattern.base": " please valid 'phone number' '+380991234567' ",
    }),
});

module.exports = {
  addSchema,
};
