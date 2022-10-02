const Joi = require("joi");

const contactsSchema = Joi.object({
  name: Joi.string().trim(true).required(),
  email: Joi.string().email().trim(true).required(),
  phone: Joi.string().required(),
});

module.exports = {
  contactsSchema,
};
