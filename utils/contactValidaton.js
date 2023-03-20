const Joi = require("joi");
const PASSWD_REGEXR = /([+(\d]{1})(([\d+() -.]){5,16})([+(\d]{1})/;

const createContactValidation = (data) =>
  Joi.object()
    .options({ abortEarly: false })
    .keys({
      name: Joi.string().min(3).max(30).required(),
      email: Joi.string().email().min(3).max(40).required(),
      phone: Joi.string().regex(PASSWD_REGEXR).required(),
      favorite: Joi.boolean().valid(false),
    })
    .validate(data);
/** https://regexr.com/ */
module.exports = createContactValidation;


