const Joi = require("joi");

const newContact = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required().email(),
  phone: Joi.number().integer().required(),
});

const updateContact = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.number().integer(),
});

module.exports = {
  newContact,
  updateContact,
};
