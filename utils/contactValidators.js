const Joi = require('joi');

exports.contactDataValidator = (data) =>
  Joi.object()
    .options({ abortEarly: false })
    .keys({
      name: Joi.string().min(2).required(),
      email: Joi.string().min(5),
      phone: Joi.string().min(7),      
    })
    .validate(data);