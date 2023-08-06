const Joi = require("joi");
const {  PASSWORD_REGEXP } = require("../../regexp");

const loginSchema = Joi.object({
  email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: false },
    }).required(),
  password: Joi.string().pattern(new RegExp(PASSWORD_REGEXP)).required(),
});

module.exports = loginSchema;