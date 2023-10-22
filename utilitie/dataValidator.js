const Joi = require("joi");

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const contactValidator = (contact) =>
  Joi.object()
    .options({ abortEarly: false })
    .keys({
      name: Joi.string().min(3).required(),
      email: Joi.string().email().required(),
      phone: Joi.string().min(10).required(),
      favorite: Joi.boolean(),
    })
    .validate(contact);

const statusValidator = (body) =>
  Joi.object()
    .options({ abortEarly: false })
    .keys({
      favorite: Joi.boolean().required(),
    })
    .validate(body);

const userSignupValidator = (body) =>
  Joi.object()
    .options({ abortEarly: false })
    .keys({
      email: Joi.string().pattern(emailRegexp).required(),
      password: Joi.string().min(6).required(),
    })
    .validate(body);

const emailValidator = (body) =>
  Joi.object()
    .options({ abortEarly: false })
    .keys({
      email: Joi.string().pattern(emailRegexp).required(),
    })
    .validate(body);

const userSigninValidator = (body) =>
  Joi.object()
    .options({ abortEarly: false })
    .keys({
      email: Joi.string().pattern(emailRegexp).required(),
      password: Joi.string().min(6).required(),
    })
    .validate(body);

module.exports = {
  contactValidator,
  statusValidator,
  userSignupValidator,
  emailValidator,
  userSigninValidator,
};
