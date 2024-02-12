const Joi = require("joi");

const validator = (schema) => (payload) =>
  schema.validate(payload, { abortEarly: false });

const contactSchema = Joi.object({
  name: Joi.string().min(2).required(),
  email: Joi.string().email().min(8).required(),
  phone: Joi.string().min(6).max(15).required(),
});

exports.validateContact = validator(contactSchema);
