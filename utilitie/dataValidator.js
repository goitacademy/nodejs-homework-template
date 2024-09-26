const Joi = require("joi");

const dataValidator = (contact) =>
  Joi.object()
    .options({ abortEarly: false })
    .keys({
      name: Joi.string().min(3).required(),
      email: Joi.string().email().required(),
      phone: Joi.string().min(10).required(),
    })
    .validate(contact);

module.exports = dataValidator;
