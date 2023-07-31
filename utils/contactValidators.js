const Joi = require('joi');
const userRolesEnum = require('../constants/userRolesEnum');

const PASSWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,128})/;

exports.createContactDataValidator = (data) =>
  Joi.object()
    .options({ abortEarly: false })
    .keys({
      name: Joi.string().min(3).max(30).required(),
      phone: Joi.string().pattern(/^\+?\d{1,3}-\d{3}-\d{3}-\d{4}$/).required(),
      email: Joi.string().email().required(),
      password: Joi.string().regex(PASSWD_REGEX).required(),
      favorite: Joi.boolean().required(),
      role: Joi.string().valid(...Object.values(userRolesEnum)),
    })
    .validate(data);

exports.updateContactDataValidator = (data) =>
  Joi.object()
    .options({ abortEarly: false })
    .keys({
      name: Joi.string().min(3).max(30).required(),
      phone: Joi.string().pattern(/^\+?\d{1,3}-\d{3}-\d{3}-\d{4}$/).required(),
      email: Joi.string().email().required(),
      password: Joi.string().regex(PASSWD_REGEX).required(),
      favorite: Joi.boolean().required(),
      role: Joi.string().valid(...Object.values(userRolesEnum)),
    })
    .validate(data);

exports.signupUserDataValidator = (data) =>
  Joi.object()
    .options({ abortEarly: false })
    .keys({
      name: Joi.string().min(3).max(30).required(),
      phone: Joi.string().pattern(/^\+?\d{1,3}-\d{3}-\d{3}-\d{4}$/).required(),
      email: Joi.string().email().required(),
      password: Joi.string().regex(PASSWD_REGEX).required(),
      favorite: Joi.boolean().required(),
    })
    .validate(data);