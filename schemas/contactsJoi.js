const Joi = require('joi');

const addContactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

const updateContactSchema = Joi.object({
  name: Joi.string().optional(),
  email: Joi.string().optional(),
  phone: Joi.string().optional(),
}).or('name', 'email', 'phone');

module.exports = {
  addContactSchema,
  updateContactSchema,
};
