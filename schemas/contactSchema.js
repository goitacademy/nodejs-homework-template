const Joi = require("joi");

const addSchema = Joi.object({
  name: Joi.string()
    .min(2)
    .max(20)
    .messages({
      message: `missing required name field`,
    })
    .required(),
  email: Joi.string()
    .messages({
      message: `missing required email field`,
    })
    .required(),

  phone: Joi.string()
    .messages({
      message: `missing required phone field`,
    })
    .required(),
  favorite: Joi.boolean(),
});

module.exports = addSchema;
