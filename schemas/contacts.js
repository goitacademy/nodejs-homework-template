const Joi = require("joi");

const addSchema = Joi.object({
  name: Joi.string().min(2).max(30).required().messages({
    "string.base": `"name" should be a type of string`,
    "string.empty": `"name" must contain value`,
    "any.required": `"name" is a required field`,
  }),
  email: Joi.string().email({ minDomainSegments: 2 }).required().messages({
    "string.base": `"email" should be a type of string`,
    "string.empty": `"email" must contain value`,
    "any.required": `"email" is a required field`,
  }),
  phone: Joi.string()
    .trim()
    .regex(/^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/)
    .required()
    .messages({
      "string.base": `"phone" should be a type of string`,
      "string.empty": `"phone" must contain value`,
      "string.pattern.base": `"phone" must be 10 digit number`,
      "any.required": `"phone" is a required field`,
    }),
});

module.exports = {
    addSchema
}