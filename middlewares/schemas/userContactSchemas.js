const Joi = require("joi");

const schemas = {
  updateContact: Joi.object({
    name: Joi.string(),
    email: Joi.string(),
    phone: Joi.string(),
  }).or("name", "email", "phone"),

  addContact: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
  }),
};

module.exports = schemas;
