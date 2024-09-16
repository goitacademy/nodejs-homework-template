const Joi = require('joi');

const contactsAddSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.bool().optional(),
})

module.exports = contactsAddSchema;
