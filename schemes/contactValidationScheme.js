const Joi = require("joi");

const contactValidationScheme = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required().email(),
  phone: Joi.string()
    .required()
    .pattern(/^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/),
  favorite: Joi.boolean(),
});

module.exports = contactValidationScheme;
