const Joi = require("joi");

exports.createContactDataValidator = (data) =>
  Joi.object()
    .options({ abortEarly: false })
    .keys({
      name: Joi.string().min(3).max(20).required(),
      email: Joi.string().email().required(),
      phone: Joi.string().required(),
    })
    .validate(data);
