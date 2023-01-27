const Joi = require("joi");

const contactSchema = Joi.object({
  name: Joi.string()
    .pattern(/^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/)
    .required(),
  email: Joi.string()
    .pattern(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)
    .required(),
  phone: Joi.string()
    .length(14)
    .pattern(/^(.)+[0-9]+(.)+\s+[0-9]+(.)+[0-9]$/)
    .required(),
});

module.exports = contactSchema;
