const Joi = require("joi");

const schemaAddContact = Joi.object({
  name: Joi.string().min(3).max(40).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

const schemaUpdateContact = Joi.object({
  name: Joi.string().min(3).max(40).optional(),
  email: Joi.string().email().optional(),
  phone: Joi.string().optional(),
});

module.exports = { schemaAddContact, schemaUpdateContact };
