const Joi = require("joi");

const validateUpdateContact = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
});

module.exports = {
  validateUpdateContact,
};
