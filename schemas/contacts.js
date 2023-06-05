const Joi = require("joi");

const contactsSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});

const contactStatus = Joi.object({
  favorite: Joi.boolean().required(),
});

module.exports = {
  contactsSchema,
  contactStatus,
};
