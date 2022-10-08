const Joi = require("joi");

const addContactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email(),
  phone: Joi.string().pattern(/^[+]?[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/),
}).or("email", "phone");

const updateContactSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string().pattern(/^[+]?[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/),
}).or("name", "email", "phone");

module.exports = {
  addContactSchema,
  updateContactSchema,
};
