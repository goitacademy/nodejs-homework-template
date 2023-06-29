const Joi = require("joi");

const addSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": `missing required 'name' field`,
    "string.empty": `'name' cannot be an empty field`,
  }),
  email: Joi.string().required().messages({
    "any.required": `missing required 'email' field`,
    "string.empty": `'email' cannot be an empty field`,
  }),

  phone: Joi.string()
    .required()
    .pattern(/^[0-9()+-]+$/)
    .messages({
      "any.required": `missing required 'phone' field`,
      "string.empty": `'phone' cannot be an empty field`,
      "string.pattern.base": `only numbers, parentheses and '+' and '-' signs`,
    }),
});

module.exports = {
  addSchema,
};
