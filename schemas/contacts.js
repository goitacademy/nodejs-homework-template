const Joi = require('joi');

const contactSchema = Joi.object({
  name: Joi.string().pattern(/^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я])?[a-zA-Zа-яА-Я]*)*$/).required().messages({
    "any.required": `missing required name field`,
    "string.pattern.base": `name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan`
  }),
  email: Joi.string().email().required().messages({
    "any.required": `missing required email field`,
    "string.email": `enter a valid email`
  }),
  phone: Joi.string().pattern(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/).required().messages({
    "any.required": `missing required phone field`,
    "string.pattern.base": `phone number must be digits and can contain spaces, dashes, parentheses and can start with +`
  }),
});

module.exports = {
  contactSchema,
}