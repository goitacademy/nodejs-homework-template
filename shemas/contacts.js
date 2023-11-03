const Joi = require("joi");

const contactAddShema = Joi.object({
  name: Joi.string()
    .pattern(/[A-Z][a-z]* [A-Z][a-z]*/)
    .required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .pattern(/\(\d{3}\) \d{3}-\d{5}/)
    .required(),
});

const contactUpdateShema = Joi.object({
  name: Joi.string().pattern(/[A-Z][a-z]* [A-Z][a-z]*/),
  email: Joi.string().email(),
  phone: Joi.string().pattern(/\(\d{3}\) \d{3}-\d{5}/),
});

module.exports = { contactAddShema, contactUpdateShema };
