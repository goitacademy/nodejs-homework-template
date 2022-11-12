const Joi = require("joi");

exports.contact = Joi.object()
  .keys({
    name: Joi.string()
        .min(3)
        .max(50)
        .required(),
    email: Joi.string()
        .email(),
    phone: Joi.string()
        .min(10)
        .max(12)
        .pattern(/^[0-9]+$/)
        .required()
  });
  