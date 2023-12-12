const Joi = require('joi');

exports.checkContact = (data) =>
  Joi.object()
    // .options({ abortEarly: false })
    .keys({
      name: Joi.string()
        .min(3)
        .max(12)
        .required()
        .messages('missing required name field'),
      email: Joi.string()
        .email()
        .required()
        .messages('missing required email field'),
      phone: Joi.string().required()
        .messages('missing required phone field'),
    })
    .validate(data);
