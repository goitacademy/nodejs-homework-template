const Joi = require("joi");
const {  PASSWORD_REGEXP } = require("../../regexp");

const registerSchema = Joi.object({
  email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: false },
    }).required(),
  password: Joi.string().pattern(new RegExp(PASSWORD_REGEXP)).required(),
  subscription: Joi.string().valid("starter", "pro", "business"),
});

module.exports = registerSchema;