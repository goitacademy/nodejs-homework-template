const Joi = require("joi");

const PHONE_REGEX = "/^(d{3}) d{3}-d{4}$/";
exports.createUserDataValidator = (data) =>
  Joi.object()
    .options({ abortEarly: false })
    .keys({
      name: Joi.string().min(3).max(30).required(),
      email: Joi.string().email().required(),
      phone: Joi.string().regex(PHONE_REGEX).required(),
      favorite: Joi.boolean().required(),
    })
    .validate(data);
