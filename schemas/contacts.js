const Joi = require("joi");

const addSchema = Joi.object({
  name: Joi.string()
    .min(2)
    .max(20)
    .messages({
      "any.required": `missing required name field`,
    })
    .required(),
  email: Joi.string()
    .email()
    .messages({
      "any.required": `missing required email field`,
    })
    .required(),
  phone: Joi.string()
    .min(5)
    .max(20)
    .messages({
      "any.required": `missing required phone field`,
    })
    .required(),
  favorite: Joi.boolean(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

module.exports = {
  addSchema,
  updateFavoriteSchema,
};
