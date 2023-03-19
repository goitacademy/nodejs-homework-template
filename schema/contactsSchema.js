const Joi = require("joi");

const contactsSchema = Joi.object().keys({
  name: Joi.string().min(3).max(50).required(),
  email: Joi.string().email(),
  phone: Joi.string().min(14),
});

module.exports = contactsSchema;