const Joi = require("joi");

const schemaCreateContact = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    "any.required": "missing required name field",
  }),
  email: Joi.string().required().messages({
    "any.required": "missing required email field",
  }),
  phone: Joi.string().pattern(new RegExp("[0-9]")).min(9).required().messages({
    "any.required": "missing required phone field",
  }),
});

const schemaUpdateContact = Joi.object({
  name: Joi.string().min(3).max(30),
  email: Joi.string(),
  phone: Joi.string().pattern(new RegExp("[0-9]")).min(9),
});

module.exports = { schemaCreateContact, schemaUpdateContact };
