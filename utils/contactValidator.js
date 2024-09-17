const Joi = require('joi')

exports.createContactDataValidator = (data) =>
  Joi.object()
    .options({ abortEarly: false })
    .keys({
      name: Joi.string().min(2).max(40).required(),
      email: Joi.string().email().required(),
      phone: Joi.string().min(10).max(14).required(),
      favorite: Joi.boolean(),
    })
    .validate(data)