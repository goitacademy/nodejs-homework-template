const Joi = require("joi");

const validateContact = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

module.exports = {
  validateContact,
};