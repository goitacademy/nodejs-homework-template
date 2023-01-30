const Joi = require("joi");

const addContactValidation = Joi.object({
  name: Joi.string().min(1).max(30).required(),
  email: Joi.string().required(),
  phone: Joi.number().integer().required(),
});

const changeContactValidation = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string(),
  phone: Joi.string().min(5).max(14),
});

const updateStatusValidation = Joi.object({
  favorite: Joi.bool().required(),
});

module.exports = {
  addContactValidation,
  updateStatusValidation,
  changeContactValidation,
};
