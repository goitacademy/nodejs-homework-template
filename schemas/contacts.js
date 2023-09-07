const Joi = require('joi');

const addContactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
}).messages({
  'any.required': `{#key} is a required field`,
  'string.email': 'email field must be a valid email',
  'string.base': `{#key} field must be a string`,
  'object.unknown': `{#key} field is not allowed`,
});

const updateContactSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
})
  .min(1)
  .messages({
    'object.min': 'missing fields',
    'string.base': `{#key} field must be a string`,
    'object.unknown': `{#key} field is not allowed`,
  });

module.exports = {
  addContactSchema,
  updateContactSchema,
};
