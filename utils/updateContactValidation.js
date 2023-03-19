const Joi = require("joi");
const PASSWD_REGEXR = /([+(\d]{1})(([\d+() -.]){5,16})([+(\d]{1})/;

const updateContactValidation = (data) =>
  Joi.object()
    .options({ abortEarly: false })
    .keys({
      name: Joi.string().min(3).max(30),
      email: Joi.string().email().min(3).max(40),
      phone: Joi.string().regex(PASSWD_REGEXR),
      favorite: Joi.boolean(),
    })
    .validate(data);

module.exports = updateContactValidation;