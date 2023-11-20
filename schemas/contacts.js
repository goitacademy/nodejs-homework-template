const Joi = require("joi");

const contactsSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string()
    .regex(/^\(\d{3}\) \d{3}-\d{4}$/)
    .required(),
  favorite: Joi.boolean(),
});

const patchScheme = Joi.object({
  favorite: Joi.boolean().required(),
});

module.exports = { contactsSchema, patchScheme };
