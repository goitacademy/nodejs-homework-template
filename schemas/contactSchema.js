const Joi = require("joi");

const addContactSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().min(3).required(),
  phone: Joi.string().min(3).required(),
});

module.exports = {
  addContactSchema,
};
