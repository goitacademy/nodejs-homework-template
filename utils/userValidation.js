const Joi = require("joi");

const PASSWD_REGEXR = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

exports.registerUserValidation = (data) =>
  Joi.object()
    .options({ abortEarly: false })
    .keys({
      password: Joi.string().regex(PASSWD_REGEXR).required(),
      email: Joi.string().email().min(3).max(40).required(),
      
    })
    .validate(data);

exports.loginUserValidation = (data) =>
  Joi.object()
    .options({ abortEarly: false })
    .keys({
      password: Joi.string().regex(PASSWD_REGEXR).required(),
      email: Joi.string().email().min(3).max(40).required(),
    })
    .validate(data);

exports.verifyEmailValidation = (data) =>
  Joi.object()
    .options({ abortEarly: false })
    .keys({
      email: Joi.string().email().min(3).max(40).required(),
    })
    .validate(data);