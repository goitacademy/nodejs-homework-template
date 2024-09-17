const Joi = require("joi");
const { PHONE_REGEXP } = require("../../regexp");

const newContactSchema = Joi.object().keys({
  name: Joi.string().min(2).max(40).required(),

  email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: false },
    }).required(),

  phone: Joi.string().pattern(new RegExp(PHONE_REGEXP)),

  favorite: Joi.boolean(),
});

module.exports = newContactSchema;