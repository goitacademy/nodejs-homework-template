const Joi = require("joi");

const addSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": `"name" is a required field`,
    "string.empty": `"name" cannot be an empty field`,
  }),
  email: Joi.string().required().messages({
    "any.required": `"email" is a required field`,
    "string.empty": `"email" cannot be an empty field`,
  }),
  phone: Joi.string().required().messages({
    "any.required": `"phone" is a required field`,
    "string.empty": `"phone" cannot be an empty field`,
  }),
});

module.exports = addSchema;