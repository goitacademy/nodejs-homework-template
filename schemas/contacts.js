const Joi = require("joi");

const addSchema = Joi.object({
  name: Joi.string()
    .min(2)
    .max(30)
    .messages({ "any.require": `missing required name field` })
    .required(),

  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .messages({ "any.require": `missing required email field` })
    .required(),

  phone: Joi.string()
    .messages({ "any.require": `missing required phone field` })
    .required(),

  favorite: Joi.boolean(),
});

module.exports = {
  addSchema,
};
