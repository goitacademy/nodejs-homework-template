const Joi = require("joi");

const contactValidator = Joi.object({
  name: Joi.string()
    .trim()
    .min(2)
    .pattern(/(^[a-zA-Z][a-zA-Z\s]{0,20}[a-zA-Z]$)/),

  email: Joi.string()
    .email()
    .trim()
    .pattern(/(^$|^.*@.*\..*$)/),

  phone: Joi.string()
    .trim()
    .pattern(/^\+?[\d\s()-]+$/),

  favorite: Joi.boolean(),
});

module.exports = contactValidator;
