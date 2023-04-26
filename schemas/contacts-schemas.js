const Joi = require("joi");

const addSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": `"name" is a required field`,
    "string.base": `"name" should be a type of string`,
    "string.empty": `"name" cannot be an empty field`,
    "string.min": `"name" should have a minimum length of 2`,
  }),
  email: Joi.string().required().messages({
    "any.required": `"email" is a required field`,
    "string.base": `"email" should be a type of string`,
    "string.empty": `"email" cannot be an empty field`,
    "string.min": `"email" should have a minimum length of 6`,
  }),
  phone: Joi.string().required().messages({
    "any.required": `"phone" is a required field`,
    "string.base": `"phone" should be a type of string`,
    "string.empty": `"phone" cannot be an empty field`,
    "string.min": `"phone" should have a minimum length of 10`,
  }),
});

module.exports = { addSchema };
