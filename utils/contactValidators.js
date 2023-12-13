const Joi = require("joi");

exports.createContactDataValidator = (data) =>
  Joi.object()
    .keys({
      name: Joi.string().min(2).max(15).required(),
      email: Joi.string().email().required(),
      phone: Joi.string().min(10).max(15).required(),
    })
    .validate(data);

exports.updateContactDataValidator = (data) =>
  Joi.object()
    .keys({
      name: Joi.string().min(2).max(15).required(),
      email: Joi.string().email().required(),
      phone: Joi.string().min(10).max(15).required(),
    })
    .validate(data);
