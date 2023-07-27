const Joi = require('joi');

const userRolesEnum = require('../constants/userRolesEnum');

const PASSWD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,128})/;

exports.createUserDataValidator = (data) =>
  Joi.object()
    .options({ abortEarly: false })
    .keys({
      name: Joi.string().min(3).max(30).required(),
      year: Joi.number().min(1940).max(2023),
      email: Joi.string().email().required(),
      password: Joi.string().regex(PASSWD_REGEX).required(),
      role: Joi.string().valid(...Object.values(userRolesEnum)),
    })
    .validate(data);

exports.updateUserDataValidator = (data) =>
  Joi.object()
    .options({ abortEarly: false })
    .keys({
      name: Joi.string().min(3).max(30),
      year: Joi.number().min(1940).max(2023),
      email: Joi.string().email(),
      password: Joi.string().regex(PASSWD_REGEX),
      role: Joi.string().valid(...Object.values(userRolesEnum)),
    })
    .validate(data);

exports.signupUserDataValidator = (data) =>
  Joi.object()
    .options({ abortEarly: false })
    .keys({
      name: Joi.string().min(3).max(30).required(),
      year: Joi.number().min(1940).max(2023),
      email: Joi.string().email().required(),
      password: Joi.string().regex(PASSWD_REGEX).required(),
    })
    .validate(data);
