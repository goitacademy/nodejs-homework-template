const Joi = require('joi');

exports.createContactValidator = data =>
  Joi.object()
    .keys({
      name: Joi.string().min(3).max(20).required(),
      email: Joi.string().min(3).max(20).required(),
      phone: Joi.string()
        .regex(/^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$/)
        .required(),
    })
    .validate(data);

exports.updateContactValidator = data =>
  Joi.object()
    .keys({
      name: Joi.string().min(3).max(20),
      email: Joi.string().min(3).max(20),
      phone: Joi.string().regex(/^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$/),
    })
    .validate(data);
