const Joi = require("joi");

const addContactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().min(7).max(15).required(),
  favorite: Joi.boolean(),
});

const updateContactSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

module.exports = { addContactSchema, updateContactSchema };
