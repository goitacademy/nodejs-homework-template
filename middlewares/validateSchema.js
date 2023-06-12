const Joi = require("joi");

const addSchema = Joi.object({
  name: Joi.string()
    .messages({
      "any.required": `missing required name field`,
    })
    .required(),
  email: Joi.string()
    .messages({
      "any.required": `missing required email field`,
    })
    .required(),
  phone: Joi.string()
    .messages({
      "any.required": `missing required phone field`,
    })
    .required(),
});

module.exports = addSchema; 