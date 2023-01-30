const Joi = require("joi");

const addContactSchema = Joi.object({
  name: Joi.string().min(1).max(30).required(),

  email: Joi.string().min(1).max(30).required(),

  phone: Joi.string().min(1).max(30).required(),
});

module.exports = {
  addContactSchema,
};
