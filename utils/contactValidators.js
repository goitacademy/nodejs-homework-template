const Joi = require('joi');

exports.createUserDataValidator = (data) =>
  Joi.object()
    .options({ abortEarly: false })
    .keys({
      name: Joi.string().min(2).required(),
      email: Joi.string().min(2).required(),
      phone: Joi.string().min(2).required(),
    })
    .validate(data);  