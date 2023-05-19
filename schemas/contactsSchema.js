const Joi = require("joi");

const contactsSchema = Joi.object({
  name: Joi.string().min(2).required(),
  phone: Joi.string().required(),
  email: Joi.string().email().required(),
});

module.exports = contactsSchema;
