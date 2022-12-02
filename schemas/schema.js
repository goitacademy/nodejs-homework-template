const Joi = require('joi');

const contact = {
  name: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string().pattern(/^\(\d{3}\)\s\d{3}-\d{4}$/),
};

const contactsAddSchema = Joi.object({
  name: contact.name.required(),
  email: contact.email.required(),
  phone: contact.phone.required(),
});

const contactsUpdateSchema = Joi.object({
  name: contact.name.optional(),
  email: contact.email.optional(),
  phone: contact.phone.optional(),
});

module.exports = {
  contactsAddSchema,
  contactsUpdateSchema,
};
