const Joi = require("joi");

const newContactSchema = Joi.object({
  name: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(5).required(),
});

const updateContactSchema = Joi.object({
  name: Joi.string().min(3),
  email: Joi.string().email(),
  phone: Joi.string().min(5),
}).or("name", "email", "phone");

module.exports = { newContactSchema, updateContactSchema };
