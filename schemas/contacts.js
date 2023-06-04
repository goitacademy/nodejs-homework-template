const Joi = require("joi");

const contactsAddSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email({ tlds: false }).required(),
  phone: Joi.string().required(),
});

module.exports = contactsAddSchema;