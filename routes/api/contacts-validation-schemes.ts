const Joi = require("joi");

const schemaCreateContact = Joi.object({
  name: Joi.string().min(2).max(40).required().messages({
    "any.required": "Missing required name field",
    "string.empty": "The name field cannot be empty",
  }),
  age: Joi.number().min(18).max(100).required().messages({
    "any.required": "Missing required name field",
  }),
  email: Joi.string().trim().email().required().messages({
    "any.required": "Missing required name field",
    "string.empty": "The name field cannot be empty",
  }),
});

const schemaUpdateContact = Joi.object({
  name: Joi.string().min(2).max(40).required().messages({
    "any.required": "Missing fields",
    "string.empty": "The name field cannot be empty",
  }),
  age: Joi.number().min(18).max(100).required().messages({
    "any.required": "missing fields",
  }),
  email: Joi.string().trim().email().required().messages({
    "any.required": "Missing fields",
    "string.empty": "The name field cannot be empty",
  }),
});

module.exports = { schemaCreateContact, schemaUpdateContact };
