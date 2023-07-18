const Joi = require('joi');

exports.createContactDataValidator = (data) =>
  Joi.object()
    .options({ abortEarly: false })
    .keys({
      name: Joi.string().min(3).max(12).required(),
      phone: Joi.string().pattern(/^\+?\d{1,3}-\d{3}-\d{3}-\d{4}$/).required(),
      email: Joi.string().email().required(),
    })
    .validate(data);