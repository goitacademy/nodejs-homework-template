const Joi = require("joi");

const contactsJoiSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string(),
  phone: Joi.string(),
  favorite: Joi.boolean(),
});

module.exports = contactsJoiSchema;