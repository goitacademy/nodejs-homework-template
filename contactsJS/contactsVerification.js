const Joi = require('joi');

const contactSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(6).max(15).required(),
});

const validateContact = contact => {
  return contactSchema.validate(contact);
};

module.exports = { validateContact };
