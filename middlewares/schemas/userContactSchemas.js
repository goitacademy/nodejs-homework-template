const Joi = require("joi");

const schemas = {
  updateContact: Joi.object({
    name: Joi.string(),
    email: Joi.string(),
    phone: Joi.string(),
    favorite: Joi.boolean(),
  }).or("name", "email", "phone", "favorite"),

  addContact: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
    favorite: Joi.boolean(),
  }),
  updateContactStatus: Joi.object({
    favorite: Joi.boolean().required(),
  }),
};

module.exports = schemas;
