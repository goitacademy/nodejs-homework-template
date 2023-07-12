const Joi = require('joi');

const PASSWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,128})/;

exports.createUserDataValidator = (data) => {
  return Joi.object()
    .options({ abortEarly: false })
    .keys({
      password: Joi.string().regex(PASSWD_REGEX).required(),
      email: Joi.string().email().required(),
    })
    .validate(data)
};

exports.updateUserDataValidator = (data) => {
  return Joi.object()
    .options({ abortEarly: false })
    .keys({
        email: Joi.string().email().required(),
        subscription: Joi.string().required(),
    })
        .validate(data)};
    
exports.signupUserDataValidator = (data) => {         
  return Joi.object()
    .options({ abortEarly: false })
    .keys({
      email: Joi.string().email().required(),
      password: Joi.string().regex(PASSWD_REGEX).required(),
    })
    .validate(data)
};
    
exports.newPassValidator = (data) => {
  return Joi.object()
    .options({ abortEarly: false })
    .keys({
      currentPassword: Joi.string().regex(PASSWD_REGEX).required(),
      newPassword: Joi.string().regex(PASSWD_REGEX).required(),
    })
    .validate(data)
};