const Joi = require("joi");

const addSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "Missing required name field",
    "string.base": "Name must be text",
  }),
  email: Joi.string().required().messages({
    "any.required": "Missing required email field",
    "string.base": "Email must be text",
  }),
  phone: Joi.string().required().messages({
    "any.required": "Missing required phone field",
    "string.base": "Phone must be text",
  }),
});

module.exports = {
  addSchema,
};
