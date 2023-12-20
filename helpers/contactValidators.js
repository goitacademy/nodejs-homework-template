const Joi = require("joi");

exports.createContactDataValidator = (data) =>
  Joi.object()
    .options({ abortEarly: false })
    .keys({
      name: Joi.string().min(3).max(30).required(),
      email: Joi.string().email().required(),
      phone: Joi.string().min(7).required(),
      favorite: Joi.boolean(),
    })
    .validate(data);

exports.updateContactDataValidator = (data) =>
  Joi.object()
    .keys({
      name: Joi.string().min(3).max(30).required(),
      email: Joi.string().email().required(),
    })
    .validate(data);


    