const Joi = require("joi");

const addSchema = Joi.object({
  name: Joi.string()
    .pattern(/^[a-zA-Z0-9]+(\s[a-zA-Z0-9]+)?$/)
    .required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .pattern(/^(\(\d{3}\)\s*\d{3}-\d{4}|\d{5,15})$/)
    .required(),
});

const updateSchema = Joi.object({
  name: Joi.string().pattern(/^[a-zA-Z0-9]+(\s[a-zA-Z0-9]+)?$/),
  email: Joi.string().email(),
  phone: Joi.string().pattern(/^(\(\d{3}\)\s*\d{3}-\d{4}|\d{5,15})$/),
}).or("name", "email", "phone");

module.exports = { addSchema, updateSchema };
