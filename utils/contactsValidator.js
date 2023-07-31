const Joi = require("joi");

exports.createContactDataValidator = (data) =>
  Joi.object()
    .options({ abortEarly: false })
    .keys({
      name: Joi.string().min(3).max(30).required(),
      email: Joi.string().email().required(),
      phone: Joi.string().required(),
      favorite: Joi.boolean(),
    })
    .validate(data);

exports.updateContactDataValidator = (data) =>
  Joi.object()
    .options({ abortEarly: false })
    .keys({
      name: Joi.string().min(3).max(30),
      email: Joi.string().email(),
      phone: Joi.string(),
      favorite: Joi.boolean(),
    })
    .validate(data);

exports.updateContactFavoriteValidator = (data) =>
  Joi.object()
    .keys({
      favorite: Joi.boolean(),
    })
    .validate(data);

// ===========

exports.registerUserDataValidator = (data) =>
  Joi.object()
    .options({ abortEarly: false })
    .keys({
      email: Joi.string().email().required(),
      password: Joi.string().min(3).required(),
    })
    .validate(data);

exports.loginUserDataValidator = (data) =>
  Joi.object()
    .options({ abortEarly: false })
    .keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    })
    .validate(data);
