const Joi = require('joi');

const patterns = {
  name: /[a-zA-Zа-яА-Я]*$/,
  phone: /^(?:\+\s?\d+\s?)?(?:\(\d{1,4}\))?(?:[-\s./]?\d){5,}$/,
  id: /^\d+$|^\w{8}-\w{4}-\w{4}-\w{4}-\w{12}$/,
};

const contactSchema = Joi.object({
  name: Joi.string().pattern(patterns.name).min(1).max(20).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().pattern(patterns.phone).required(),
});

module.exports = contactSchema;
