const Joi = require('joi');

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const errorMessages = {
  'any.required': `{#key} is a required field`,
  'string.email': 'email field must be a valid email',
  'string.base': `{#key} field must be a string`,
  'boolean.base': `{#key} field must be a boolean`,
  'object.unknown': `{#key} field is not allowed`,
  'object.min': 'missing fields',
};

const addContactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(emailRegexp).required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean().default(false),
}).messages(errorMessages);

const updateContactSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().pattern(emailRegexp),
  phone: Joi.string(),
  favorite: Joi.boolean(),
})
  .min(1)
  .messages(errorMessages);

const updateStatusContactSchema = Joi.object({
  favorite: Joi.boolean().required(),
}).messages({
  ...errorMessages,
  'any.required': 'missing field favorite',
});

module.exports = {
  addContactSchema,
  updateContactSchema,
  updateStatusContactSchema,
};
