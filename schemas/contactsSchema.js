const Joi = require("joi");

const addContactSchema = Joi.object({
  name: Joi.string().min(5).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(10).required(),
});

const patchContactSchema = Joi.object({
  name: Joi.string().min(5),
  email: Joi.string().email(),
  phone: Joi.string().min(10),
});

module.exports = { addContactSchema, patchContactSchema };