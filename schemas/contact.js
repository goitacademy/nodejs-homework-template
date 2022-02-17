const Joi = require("joi");

const contactSchema = Joi.object({
  email: Joi.string().required(),
  name: Joi.string().required(),
  phone: Joi.number().required(),
});

const updateContactSchema = Joi.object({
  email: Joi.string(),
  name: Joi.string(),
  phone: Joi.number(),
});

module.exports = { contactSchema, updateContactSchema };
