const Joi = require('joi');

const addContactSchema = Joi.object({
  name: Joi.string().alphanum().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

const updateContactSchema = Joi.object({
  name: Joi.string().alphanum(),
  email: Joi.string().email(),
  phone: Joi.string(),
}).min(1);

module.exports = {
  addContactSchema,
  updateContactSchema,
};
