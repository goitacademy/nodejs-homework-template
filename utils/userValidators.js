const Joi = require('joi');

exports.userDataValidator = (data) =>
  Joi.object()
    .options({ abortEarly: false })
    .keys({
      password: Joi.string().min(6).required(),
      email: Joi.string().email().required(),           
    })
    .validate(data);