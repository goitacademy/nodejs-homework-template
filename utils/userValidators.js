const Joi = require('joi');
const userRolesEnum = require('../constants/userRolesEnum');

const PASSWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,128})/;

exports.createUserDataValidator = (data) =>
  Joi.object()
    .options({ abortEarly: false })
    .keys({
        password: Joi.string().regex(PASSWD_REGEX).required(),
        email: Joi.string().email().required(),
        subscription: Joi.string().valid(...Object.values(userRolesEnum)),
        // token: Joi.string(),
    })
    .validate(data);

exports.updateUserDataValidator = (data) =>
  Joi.object()
    .options({ abortEarly: false })
    .keys({
        email: Joi.string().email().required(),
        subscription: Joi.string().required(),
    })
        .validate(data);
    
exports.signupUserDataValidator = (data) =>            
  Joi.object()
    .options({ abortEarly: false })
    .keys({
      email: Joi.string().email().required(),
      password: Joi.string().regex(PASSWD_REGEX).required(),
    })
    .validate(data);