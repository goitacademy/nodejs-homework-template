const Joi = require("joi");

const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

const contactSchemaUpd = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
});

module.exports = { contactSchema, contactSchemaUpd };
