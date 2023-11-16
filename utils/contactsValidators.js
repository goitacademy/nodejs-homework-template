const Joi = require("joi");

const contactRolesEnum = require("../constans/contactRolesEnum");

const PASSWD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,128})/;

exports.createContactDataValidator = (data) =>
  Joi.object()
    .options({ abortEarly: false })
    .keys({
      name: Joi.string().min(3).max(30).required(),
      email: Joi.string().email().required(),
      phone: Joi.string().required(),
      favorite: Joi.boolean(),
      password: Joi.string().regex(PASSWD_REGEX).required(),
      role: Joi.string().valid(...Object.values(contactRolesEnum)),
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
      password: Joi.string().regex(PASSWD_REGEX),
      role: Joi.string().valid(...Object.values(contactRolesEnum)),
    })
    .validate(data);

exports.updateFavoriteContactDataValidator = (data) =>
  Joi.object()
    .options({ abortEarly: false })
    .keys({ favorite: Joi.boolean() })
    .required()
    .validate(data);
