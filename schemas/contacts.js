const Joi = require('joi');

const addContactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
}).messages({ 'any.required': `{#key} is a required field` });

const updateContactSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
})
  .min(1)
  .messages({
    'object.min': 'missing fields',
  });

module.exports = {
  addContactSchema,
  updateContactSchema,
};
